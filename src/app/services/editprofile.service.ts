import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {


  loggedIn = false;
  editLog: string[] = [];

  constructor(private http:HttpClient) { }

  save(path: string, value: string) {
    this.editLog.push(`save: ${path}, ${value}`);
  }

  GetUserById(id:any) {
    return this.http.get(`${environment.baseURL}/user/GetUserById/${id}`);
  }


  editProfile(id:any,data:any){
  return this.http.put(`${environment.baseURL}/user/UpdateUser/${id}`,data)
}




}
