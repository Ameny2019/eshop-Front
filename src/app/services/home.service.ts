import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getProducts(limit?:number) {
    const query = limit ? `?limit=${limit}` : '';
    return this.http.get(`${environment.baseURL}/home/products${query}`);
  }
  getProductDetails(id:any) {
    return this.http.get(`${environment.baseURL}/home/products/${id}`);
  }
}
