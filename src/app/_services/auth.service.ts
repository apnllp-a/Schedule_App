import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
})
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

    // register, login, logout

    refreshToken() {
      return this.http.post(AUTH_API + 'refreshtoken', {  }, httpOptions);
    }
  

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
        
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, name: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        name
      },
      httpOptions
    );
  }

  

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }


  private apiUrl = 'http://localhost:8080/users'; // Update with your actual backend URL


  registerx(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true  // Ensure credentials are sent with the request
    };
    return this.http.post(`${this.apiUrl}/register`, user, httpOptions);
  }

  loginx(credentials: { username: string, password: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true  // Ensure credentials are sent with the request
    };
    return this.http.post(`${this.apiUrl}/login`, credentials, httpOptions);
  }
}
