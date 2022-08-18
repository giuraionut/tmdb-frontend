import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, API_URL_V3 } from '../shared/constants';
import { Movies } from '../models/movies';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  public getPopular(page: number): Observable<Movies> {
    return this.http.get<Movies>(`${API_URL_V3}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
  }
  public getFavorites(page: number): Observable<any> {
    let accountId = localStorage.getItem('account_id');
    let sessionId = localStorage.getItem('session_id');
    return this.http.get(`${API_URL_V3}/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=${page}`);
  }
}
