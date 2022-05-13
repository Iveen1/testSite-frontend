import { Injectable } from '@angular/core';
import {LoginInfo} from "../../auth/login-info";
import {Observable} from "rxjs";
import {JwtTokenResponse} from "../../auth/jwt-response";
import {RegisterInfo} from "../../auth/register-info";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
// TODO: все статики заменить на env
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginInfo): Observable<JwtTokenResponse> {
    return this.http.post<JwtTokenResponse>("http://localhost:8080/api/auth/signin", credentials, httpOptions);
  }

  register(credentials: RegisterInfo): Observable<string> {
    return this.http.post<string>("http://localhost:8080/api/auth/signup", credentials, httpOptions);
  }

}
