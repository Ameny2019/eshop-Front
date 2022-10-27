import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(`${environment.baseURL}/auth/register`, user)
  }

  accountConfirmation(code: any) {
    return this.http.get(`${environment.baseURL}/auth/account-activation/${code}`)
  }

  login(user: any) {
    return this.http.post(`${environment.baseURL}/auth/login`, user)
  }

  logout() {
    return this.http.get(`${environment.baseURL}/auth/logout`)
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  isConnected() {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
  }

  getCoonectedUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logoutUser() {
    this.logout().subscribe(
      (response: any) => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      (error: any) => {
      });
  }



}
