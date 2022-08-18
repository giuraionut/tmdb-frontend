import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { LoginRequest } from 'src/app/models/loginRequest';
import { RequestToken } from 'src/app/models/requestToken';
import { Session } from 'src/app/models/session';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLoginClick(username: string, password: string): void {
    let loginData: LoginRequest = {
      'username': username,
      'password': password,
      'request_token': ''
    }
    console.log(loginData);
    this.userService.getRequestToken().pipe(
      map((requestToken: RequestToken) => requestToken.request_token),
      mergeMap(requestToken => {
        loginData.request_token = requestToken;
        return this.userService.validateTokenWithLogin(loginData);
      }),
      map((requestToken: RequestToken) => requestToken.request_token),
      mergeMap(requestToken => this.userService.getSessionId(requestToken)),
      map((session: Session) => session.session_id),
    ).subscribe();
  }
}
