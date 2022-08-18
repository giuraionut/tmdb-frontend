import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private sharedService: SharedService) { }

  isLogged: boolean = false;
  ngOnInit(): void {
    this.sharedService.selectIsLogged$.subscribe(value => this.isLogged = value);
    localStorage.getItem('session_id') ? this.sharedService.setIsLogged(true) : this.sharedService.setIsLogged(false);
  }

  logout(): void {
    localStorage.clear();
    this.sharedService.setIsLogged(false)
  }
  setMoviesType(moviesType: string) {
    this.sharedService.setMoviesType(moviesType);
  }
}
