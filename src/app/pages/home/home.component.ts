import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { PopularMovies } from 'src/app/models/popularMovies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  movies: Movie[] = []
  descending = (a: Movie, b: Movie) => b.vote_average - a.vote_average;
  ascending = (a: Movie, b: Movie) => a.vote_average - b.vote_average;
  page: number = 1;
  moviesType: string = "favorite";
  ngOnInit(): void {
    this.movieService.getPopular(this.page).pipe(
      map((popularMovies: PopularMovies) => popularMovies.results),
      map(movies => this.movies = movies)
    ).subscribe()
  }

  goToPage(page: number) {
    switch (this.moviesType) {
      case "popular":
        this.movieService.getPopular(page).pipe(
          map((popularMovies: PopularMovies) => popularMovies.results),
          map(movies => this.movies.push(...movies))
        ).subscribe()
        break;
      case "favorite":
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
