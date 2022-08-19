import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("Error message: ", error.message);
        console.log("Error name: ", error.name);
        console.log("Error status: ", error.status);
        switch (error.status) {
          case 401:
            this.router.navigate(['home/login']);
            this.snackBar.open("Unauthorized, you must log in first.", 'Close', { duration: 10000 });
            console.log("Navigate to login");
            break;
          case 404:
            this.snackBar.open("Sorry, the page that you request is not found.", 'Close', { duration: 10000 });
            break;
        }
        return of();
      })
    )
  }
}
