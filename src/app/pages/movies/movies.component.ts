import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, merge, mergeMap, Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Movies } from 'src/app/models/movies';
import { AccountService } from 'src/app/services/account.service';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute) { }

  movies: Movie[] = []
  moviesSlice: Movie[] = []

  page: number = 1;
  title: string = '';

  descending = (a: Movie, b: Movie) => b.vote_average - a.vote_average;
  ascending = (a: Movie, b: Movie) => a.vote_average - b.vote_average;

  selectService(moviesType: string): Observable<any> {
    this.title = moviesType;
    switch (moviesType) {
      case "favorites":
        return this.accountService.getFavorites(this.page);
      default: {
        return this.activatedRoute.queryParams.pipe(
          map(params => params['title']),
          mergeMap(title => title ? this.movieService.search(title) : this.movieService.getPopular(this.page))
        );
      }
    }
  }
  ngOnInit(): void {
    this.activatedRoute.url.pipe(
      map(url => { console.log(url); return url.pop()!.path }),
      mergeMap(type => this.selectService(type)),
      map((movies: Movies) => movies.results),
      map(movies => movies.sort(this.ascending)),
      map(movies => this.movies = movies),
      map(movies => this.moviesSlice = movies.slice(0, 10))
    ).subscribe();

  }
  onPageChange(event: any) {
    let previousPageIndex = event.previousPageIndex;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let length = event.length;
    this.moviesSlice = this.movies.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
    //check movies length, if its more than 20 fetch and append.
  }

  removeFromFavorite(id: number, event: boolean) {
    if (event && this.title === 'favorites')
      this.moviesSlice = this.moviesSlice.filter(movie => movie.id != id);
  }
  sortAscending() {
    this.moviesSlice.sort(this.ascending);
  }
  sortDescending() {
    this.moviesSlice.sort(this.descending);
  }

}
