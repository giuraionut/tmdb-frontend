import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private moviesType$ = new BehaviorSubject<string>('popular');
    selectedMoviesType$ = this.moviesType$.asObservable();


    private isLogged$ = new BehaviorSubject<boolean>(false);
    selectIsLogged$ = this.isLogged$.asObservable();

    constructor() { }

    setIsLogged(value: boolean) {
        this.isLogged$.next(value);
    }

    setMoviesType(moviesType: string) {
        this.moviesType$.next(moviesType);
    }


}
