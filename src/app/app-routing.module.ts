import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children:
      [
        // { path: '', redirectTo: 'movies/favorites', pathMatch: 'full' },
        { path: 'movies', component: MoviesComponent },
        { path: 'movies/favorites', component: MoviesComponent },
        { path: 'login', component: LoginComponent },
      ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
