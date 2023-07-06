
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { notifiCations } from '../../models/notifications/notifications.model';
const baseUrl = 'http://localhost:8080/api/notification';
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   // 'Authorization': 'Bearer <your_token>'
// });
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {
   }

  getAll(): Observable<notifiCations[]> {
    return this.http.get<notifiCations[]>(baseUrl);
  }

  get(id: any): Observable<notifiCations> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getByID(id: any): Observable<notifiCations> {
    return this.http.get(`${baseUrl}/mess/${id}`);
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

  findByName(name: any): Observable<notifiCations[]> {
    return this.http.get<notifiCations[]>(`${baseUrl}?firstname=${name}`);
  }
}