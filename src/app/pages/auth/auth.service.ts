import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";


interface User {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'pro';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/register_user`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login_user`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.getUserInfo().subscribe();
        }
      })
    );
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<User>(`${this.apiUrl}/user/me`, {}, {headers}).pipe(
      tap(user => {
        this.userSubject.next(user);
      }),
    );
  }



  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
