import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, mergeMap } from 'rxjs';
import { LoginRequest } from 'src/app/models/loginRequest';
import { RequestToken } from 'src/app/models/requestToken';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/shared/sharedService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private accountService: AccountService,
    private sharedService: SharedService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onLoginClick(username: string, password: string): void {
    let loginData: LoginRequest = {
      'username': username,
      'password': password,
      'request_token': ''
    }
    console.log(loginData);
    this.authService.getRequestToken().pipe(
      map((requestToken: RequestToken) => requestToken.request_token),
      mergeMap(requestToken => {
        loginData.request_token = requestToken;
        return this.authService.validateTokenWithLogin(loginData);
      }),
      map((requestToken: RequestToken) => requestToken.request_token),
      mergeMap(requestToken => this.authService.getSessionId(requestToken)),
      map((session: Session) => {
        localStorage.setItem('session_id', session.session_id);
        return session.session_id
      }),
      mergeMap(sessionId => this.accountService.getUserDetails(sessionId)),
      map((user: User) => {
        localStorage.setItem('user_id', `${user.id}`);
        localStorage.setItem('username', user.username);
        localStorage.setItem('name', user.name);
        localStorage.setItem('avatar_hash', user.avatar.gravatar.hash);
        this.sharedService.setIsLogged(true);
        this.snackBar.open("You logged in successfully", "Close", { duration: 10000 });
        return user;
      })
    ).subscribe();
  }
}
