import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductInfo} from "../auth/product-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
// TODO: все статики заменить на env
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: number) {
    return this.http.get("http://localhost:8080/api/products?page="+page, httpOptions)
  }

  getProductById(productId: number) {
    return this.http.get("http://localhost:8080/api/products/"+productId, httpOptions)
  }

  addProduct(data: ProductInfo) {
    return this.http.post("http://localhost:8080/api/products/add", data, httpOptions)
  }
}
