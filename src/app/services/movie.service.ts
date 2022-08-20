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
    return this.http.get<Movies>(`${API_URL_V3}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  }


  public search(query: string): Observable<Movies> {
    return this.http.get<Movies>(`${API_URL_V3}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`);
  }
}
