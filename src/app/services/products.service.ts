import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environment/environment';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'produtos';

  api = environment.api;
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<IProduct[]>(`${this.api}/${this.endpoint}`);
  }

  register(product: IProduct) {
    return this.http.post<IProduct>(`${this.api}/${this.endpoint}`, product);
  }

  getById(id: String) {
    return this.http.get<IProduct>(`${this.api}/${this.endpoint}/${id}`);
  }

  setById(id: String, product: IProduct) {
    return this.http.put<IProduct>(`${this.api}/${this.endpoint}/${id}`, product);
  }

}
