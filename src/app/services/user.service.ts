import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FCsInfo} from "../auth/fcs-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
// TODO: все статики заменить на env
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<string> {
    return this.http.get('http://localhost:8080/api/users', { responseType: 'text' });
  }

  getMyInfo(): Observable<string> {
    return this.http.get('http://localhost:8080/api/users/my', { responseType: 'text' });
  }

  updateMyAvatar(attachmentId: string) {
    return this.http.post('http://localhost:8080/api/users/my/avatar/update?attachmentId=' + attachmentId, { responseType: 'text' });
  }

  updateMyInfo(data: FCsInfo): Observable<string> {
    console.log(data)
    return this.http.post<string>('http://localhost:8080/api/users/my/update', data, httpOptions);
  }

  addToFavorites(productId: number): Observable<string> {
    return this.http.post<string>('http://localhost:8080/api/users/my/favorites/add?productId=' + productId, httpOptions);
  }

  removeFromFavorites(productId: number): Observable<string> {
    return this.http.post<string>('http://localhost:8080/api/users/my/favorites/remove?productId=' + productId, httpOptions);
  }

  isFavorite(productId: number): Observable<string> {
    return this.http.get<string>('http://localhost:8080/api/users/my/favorites/isFavorite?productId=' + productId, httpOptions);
  }

  getFavorites(page: number): Observable<string> {
    return this.http.get<string>('http://localhost:8080/api/users/my/favorites?page=' + page, httpOptions);
  }

}
