import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Subject } from 'rxjs';
import { SharedService } from 'src/app/shared/sharedService';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedService, private snackBar: MatSnackBar, private router: Router) { }

  value = 'Search...';
  valueChanged: Subject<string> = new Subject<string>();
  isLogged: boolean = false;
  ngOnInit(): void {
    this.sharedService.getSessionId() ? this.sharedService.setIsLogged(true) : this.sharedService.setIsLogged(false);
    this.sharedService.selectIsLogged$.subscribe(value => this.isLogged = value);
    this.valueChanged.pipe(debounceTime(1000),
      map(query => {
        this.sharedService.setSearchingString(query);
        this.router.navigate(['/movies'], { queryParams: { title: query } });
        return query;
      }))
      .subscribe();
  }

  logout(): void {
    this.sharedService.setIsLogged(false);
    this.router.navigate(['/home/movies']);
    this.snackBar.open("You logged out successfully", "Close", { duration: 10000 });
  }

  onSearch(string: string) {
    if (string) {
      this.valueChanged.next(string);
    }
  }
}
