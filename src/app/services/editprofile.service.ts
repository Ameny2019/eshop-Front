import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {
  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(`${environment.baseURL}/auth/profile/`);
  }

  editProfile(data: any) {
    return this.http.put(`${environment.baseURL}/auth/profile/`, data)
  }

}
