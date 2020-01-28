import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { LoginCredentials, RegisterCredentials, AuthResponse } from './../store/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.serverAddress;

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials) {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, credentials);
  }

  register(credentials: RegisterCredentials) {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/register`, credentials);
  }

  logout() {

  }

}
