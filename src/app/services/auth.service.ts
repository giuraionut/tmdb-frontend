import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { API_KEY, API_URL_V3 } from '../shared/constants';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    public getRequestToken(): Observable<any> {
        return this.http.get(`${API_URL_V3}/authentication/token/new?api_key=${API_KEY}`);
    }

    public validateTokenWithLogin(loginRequest: LoginRequest): Observable<any> {
        return this.http.post(`${API_URL_V3}/authentication/token/validate_with_login?api_key=${API_KEY}`, loginRequest
        );
    }
    public getSessionId(requestToken: string): Observable<any> {
        let data = {
            'request_token': requestToken
        }
        return this.http.post(`${API_URL_V3}/authentication/session/new?api_key=${API_KEY}`, data);
    }


}

