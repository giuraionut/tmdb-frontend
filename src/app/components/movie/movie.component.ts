import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AccountStates } from 'src/app/models/accStates';
import { Movie } from 'src/app/models/movie';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private accountService: AccountService, private snackBar: MatSnackBar) { }
  @Input() movie!: Movie;
  @Output() deleteFavoriteEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
  spinnerColor: ThemePalette = 'primary';
  spinnerMode: ProgressSpinnerMode = 'determinate';
  isFavorite: boolean = false;
  favoriteMessage = '';

  ngOnInit(): void {
    this.accountService.checkFavorite(this.movie.id).pipe(
      map((data: AccountStates) => data.favorite),
      map(favorite => {
        this.isFavorite = favorite;
      })
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
}
