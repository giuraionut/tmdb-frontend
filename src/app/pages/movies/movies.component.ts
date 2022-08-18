import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Movies } from 'src/app/models/movies';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private sharedService: SharedService) { }
  movies: Movie[] = []
  descending = (a: Movie, b: Movie) => b.vote_average - a.vote_average;
  ascending = (a: Movie, b: Movie) => a.vote_average - b.vote_average;
  page: number = 1;
  moviesType: string = '';
  ngOnInit(): void {
    this.sharedService.selectedMoviesType$.subscribe(moviesType => {
      this.moviesType = moviesType;
      switch (moviesType) {
        case "popular":
          this.movieService.getPopular(1).pipe(
            map((popularMovies: Movies) => popularMovies.results),
            map(movies => this.movies = movies)
          ).subscribe()
          break;
        case "favorites":
          this.movieService.getFavorites(1).pipe(
            map((favoriteMovies: Movies) => favoriteMovies.results),
            map(movies => this.movies = movies)
          ).subscribe();
          break;
      }
    });
  }

  goToPage(page: number) {
    switch (this.moviesType) {
      case "popular":
        this.movieService.getPopular(page).pipe(
          map((popularMovies: Movies) => popularMovies.results),
          map(movies => this.movies.push(...movies))
        ).subscribe()
        break;
      case "favorites":
        this.movieService.getFavorites(page).pipe(
          map((favoriteMovies: Movies) => favoriteMovies.results),
          map(movies => this.movies.push(...movies))
        ).subscribe();
        break;
    }

  }
  sortAscending() {
    this.movies.sort(this.ascending);
  }
  sortDescending() {
    this.movies.sort(this.descending);
  }

}
