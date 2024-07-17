import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'pro' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:4000/api'; //

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/register_user`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login_user`, credentials);
  }


  // logout() {
  //   localStorage.removeItem('user');
  //   this.userSubject.next(null);
  //   this.router.navigate(['/']);
  // }
  //
  // autoLogin() {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     this.userSubject.next(JSON.parse(user));
  //   }
  // }
}
