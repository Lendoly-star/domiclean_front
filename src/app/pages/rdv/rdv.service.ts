import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  // private getHeaders() {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // }

  addService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pro/addService`, service);
  }

  addAvailability(availability: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pro/addAvailability`, availability);
  }

  getServices(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/pro/getAllServices`, {});
  }

  getAvailabilities(pro_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pro/availabilities/${pro_id}`);
  }

  bookRdv(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rdv/bookNewRdv`, appointmentData);
  }

  getRdv(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rdv/getRdv`);
  }

  getAvailablePros(serviceId: number, date: string, time: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rdv/getAvailabilities`, {
      params: { serviceId: serviceId.toString(), date, time }
    });
  }
}

