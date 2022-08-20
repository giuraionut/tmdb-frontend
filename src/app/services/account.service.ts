import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_KEY, API_URL_V3 } from '../shared/constants';
import { Movies } from '../models/movies';
import { Favorite } from '../models/favorite';
@Injectable({
    providedIn: 'root'
})
export class AccountService {

    accountId = '';
    sessionId = '';
    constructor(private http: HttpClient) {
        this.accountId = localStorage.getItem('account_id')!;
        this.sessionId = localStorage.getItem('session_id')!;
    }
    public getFavorites(page: number): Observable<Movies> {
        return this.http.get<Movies>(`${API_URL_V3}/account/${this.accountId}/favorite/movies?api_key=${API_KEY}&session_id=${this.sessionId}&language=en-US&sort_by=created_at.asc&page=${page}`);
    }
    public getUserDetails(sessionId: string): Observable<any> {
        return this.http.get(`${API_URL_V3}/account?api_key=${API_KEY}&session_id=${sessionId}`);
    }
    public markFavorite(body: Favorite): Observable<any> {
        return this.http.post(`${API_URL_V3}/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${this.sessionId}`, body);
    }

    public checkFavorite(movieId: number): Observable<any> {
        return this.http.get(`${API_URL_V3}/movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${this.sessionId}`);
    }
}
