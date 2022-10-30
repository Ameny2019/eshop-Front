import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EfleureService {

  constructor(private http: HttpClient) { }

    getfleurs(){
      return this.http.get(`${environment.baseURL}/efleur/GetAllEfleur/`)
    }
}
