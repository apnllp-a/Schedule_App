import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user-all.model';
// const baseUrl = 'http://localhost:8080/users';
@Injectable({
  providedIn: 'root'
})
export class UserAllService {
  private baseUrl: string = 'http://localhost:8080/users';
  constructor(private http:HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByFirstName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?firstname=${name}`);
  }

  findByUser(user: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?firstname=${user}`);
  }
}
