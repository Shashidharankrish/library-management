import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
   
    return this.http
      .get<any[]>(
        `${this.apiUrl}/users?username=${credentials.username}&password=${credentials.password}`
      )
      .pipe(
        catchError((error) => {
          console.error('Login failed:', error);
          return of(null);
        })
      );
  }

  register(userDetails: any): Observable<any> {
  
    return this.http.post<any>(`${this.apiUrl}/users`, userDetails).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }
}
