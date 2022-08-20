import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SharedService {


    private isLogged$ = new BehaviorSubject<boolean>(false);
    selectIsLogged$ = this.isLogged$.asObservable();

    private searchingString$ = new BehaviorSubject<string>('');
    selectSearchingString$ = this.searchingString$.asObservable();
    constructor() { }

    setIsLogged(value: boolean) {
        this.isLogged$.next(value);
        if (!value) {
            localStorage.clear();
        }
    }

    setSearchingString(query: string) {
        if (query)
            this.searchingString$.next(query);
    }
}
