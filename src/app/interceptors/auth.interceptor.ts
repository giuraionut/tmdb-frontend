import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("url", request.url);
    // let url = request.url;
    // if (url.includes('/account')) {
    //   let reqClone = request.clone();
    //   if (localStorage.getItem('session_id')) {
    //     let session_id = localStorage.getItem('session_id');
    //     reqClone.body.append('session_id', session_id);
    //     return next.handle(reqClone);
    //   }
    //   else {
    //     this.router.navigate(['login']);
    //     console.log("No session ID");
    //   }
    // }
    return next.handle(request);
  }
}
