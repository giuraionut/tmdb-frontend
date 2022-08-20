import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, EMPTY, map, mergeMap } from 'rxjs';
import { AccountStates } from 'src/app/models/accStates';
import { Movie } from 'src/app/models/movie';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private accountService: AccountService, private snackBar: MatSnackBar, private sharedService: SharedService) { }
  @Input() movie!: Movie;
  @Output() deleteFavoriteEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';
  isFavorite: boolean = false;
  favoriteMessage = '';
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    this.sharedService.selectIsLogged$.pipe(
      delay(1000),
      map(isAuth => this.isAuthenticated = isAuth),
      mergeMap(isAuth => isAuth ? this.accountService.checkFavorite(this.movie.id) : EMPTY),
      map((result: AccountStates) => result.favorite),
      map(favorite => this.isFavorite = favorite)
    ).subscribe();
  }

  markAsFavorite() {
    this.accountService.markFavorite({ "media_type": "movie", "media_id": this.movie.id, "favorite": !this.isFavorite })
      .pipe(
        map(result => result.success),
        map(success => {
          success ?
            this.snackBar.open(!this.isFavorite ? `${this.movie.title} added as favorite` : `${this.movie.title} removed from favorites`, 'Close', { duration: 10000 }) :
            this.snackBar.open(`Something went wrong`, 'Close', { duration: 10000 });
          this.isFavorite = !this.isFavorite;
          this.deleteFavoriteEvent.emit(true);
        }
        )
      )
      .subscribe();
  }

  getPoster(size: number): string {
    return this.movie.poster_path ? `https://image.tmdb.org/t/p/w${size}/${this.movie.poster_path}` : '/assets/no_poster.png';
  }
}
