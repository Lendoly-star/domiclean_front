import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans localStorage lors de la connexion
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addService(service: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pro/addService`, service, { headers: this.getAuthHeaders() });
  }

  addAvailability(availability: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/pro/addAvailability`, availability, { headers: this.getAuthHeaders() });
  }

  getServices(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/pro/getAllServices`, {}, { headers: this.getAuthHeaders() });
  }

  getProServices(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/pro/proServices`, {}, { headers: this.getAuthHeaders() });
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

  getProsByService(serviceId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/pro/getProsByService`, {
      params: { serviceId: serviceId.toString() },
    }, {headers: this.getAuthHeaders(),});
  }
}
