import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'produtos';

  api = environment.api;
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.api}/${this.endpoint}`);
  }


}