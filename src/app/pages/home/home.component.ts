import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedService, private snackBar: MatSnackBar) { }

  isLogged: boolean = false;
  ngOnInit(): void {
    this.sharedService.selectIsLogged$.subscribe(value => this.isLogged = value);
    localStorage.getItem('session_id') ? this.sharedService.setIsLogged(true) : this.sharedService.setIsLogged(false);
  }

  logout(): void {
    localStorage.clear();
    this.sharedService.setIsLogged(false)
    this.snackBar.open("You logged out successfully", "Close", { duration: 10000 });
  }
  setMoviesType(moviesType: string) {
    this.sharedService.setMoviesType(moviesType);
  }
}
