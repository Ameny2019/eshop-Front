import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { EditProfileService } from './editprofile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Persisting user authentication with BehaviorSubject in Angular
  // Link : https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
  isLoginSubject = new BehaviorSubject<boolean>(this.isConnected());
  usernameSubject = new BehaviorSubject<string>('');
  avatarSubject = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private editprofileService: EditProfileService) {
      if(this.isConnected()){
        this.loadDataFromCurrentProfile();
      }
  }

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

  forgotPassword(playload: any) {
    return this.http.post(`${environment.baseURL}/auth/forgot-password`, playload);
  }

  resetPassword(playload: any) {
    return this.http.post(`${environment.baseURL}/auth/reset-password`, playload);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.isLoginSubject.next(true);
    this.loadDataFromToken();
  }

  loadDataFromToken(){
    const token = localStorage.getItem('token');
    if(token){
      const decoded:any= jwt_decode(token);
      this.usernameSubject.next(decoded?.username);
      this.avatarSubject.next(decoded?.avatar);
    }
  }

  loadDataFromCurrentProfile(){
    this.editprofileService
    .getProfile()
    .subscribe((response: any) => {
      this.usernameSubject.next(response?.data?.nom);
      this.avatarSubject.next(response?.data?.avatar);
    });
  }

  private isConnected(): boolean {
    // check if token !=null && token !== undefined
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    this.logout().subscribe(
      (response: any) => {
        this.clearUserData();
      },
      (error: any) => {
        this.clearUserData();
      });
  }

  clearUserData(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.isLoginSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  isExpiredToken(token: string): boolean {
    const decoded:any= jwt_decode(token);
    return Math.floor(new Date().getTime()/1000)>=decoded.exp
  }


}
