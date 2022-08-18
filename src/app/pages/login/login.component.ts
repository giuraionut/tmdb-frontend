import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { LoginRequest } from 'src/app/models/loginRequest';
import { RequestToken } from 'src/app/models/requestToken';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private sharedService: SharedService) { }

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
      map((session: Session) => {
        localStorage.setItem('session_id', session.session_id);
        return session.session_id
      }),
      mergeMap(sessionId => this.userService.getUserDetails(sessionId)),
      map((user: User) => {
        localStorage.setItem('user_id', `${user.id}`);
        localStorage.setItem('username', user.username);
        localStorage.setItem('name', user.name);
        localStorage.setItem('avatar_hash', user.avatar.gravatar.hash);
        this.sharedService.setIsLogged(true);
        return user;
      })
    ).subscribe();
  }
}
