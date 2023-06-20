
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dataUsers } from '../../models/data-users/data_users.model';
const baseUrl = 'http://localhost:8080/api/data_users';
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   // 'Authorization': 'Bearer <your_token>'
// });
@Injectable({
  providedIn: 'root'
})
export class ServicesAllService {

  constructor(private http: HttpClient) {
   }

  getAll(): Observable<dataUsers[]> {
    return this.http.get<dataUsers[]>(baseUrl);
  }

  get(id: any): Observable<dataUsers> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<dataUsers[]> {
    return this.http.get<dataUsers[]>(`${baseUrl}?firstname=${name}`);
  }
}