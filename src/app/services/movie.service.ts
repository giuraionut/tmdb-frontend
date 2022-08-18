import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly URL = "https://api.themoviedb.org/3";
  private readonly API_KEY = "73c84272fa6960d6f3bbff1e516001bf";
  constructor(private http: HttpClient) { }

  public getLatestMovies(): Observable<any> {
    return this.http.get(`${this.URL}/movie/latest`);
  }

  public getFavoriteMovies(SESSION_ID: string): Observable<any> {
    return this.http.get(`${this.URL}/account/favorite/movies?api_key=${this.API_KEY}&session_id=${SESSION_ID}&language=en-US&sort_by=created_at.asc&page=1`);
  }
}
