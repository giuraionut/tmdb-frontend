import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_KEY, API_URL_V3 } from '../shared/constants';
import { PopularMovies } from '../models/popularMovies';
import { Movie } from '../models/movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }


  public getPopular(page: number): Observable<PopularMovies> {
    return this.http.get<PopularMovies>(`${API_URL_V3}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
  }
}
