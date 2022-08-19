import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private moviesType$ = new BehaviorSubject<string>('popular');
    selectedMoviesType$ = this.moviesType$.asObservable();


    private isLogged$ = new BehaviorSubject<boolean>(false);
    selectIsLogged$ = this.isLogged$.asObservable();

    constructor(private router: Router, private snackBar: MatSnackBar) { }

    setIsLogged(value: boolean) {
        this.isLogged$.next(value);
    }

    setMoviesType(moviesType: string) {
        this.moviesType$.next(moviesType);
    }


}
