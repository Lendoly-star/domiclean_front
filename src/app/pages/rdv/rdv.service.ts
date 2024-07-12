import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) {}

  // Récupère les rendez-vous pour un utilisateur spécifique
  getUserRdv(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rdv/user/${userId}`);
  }

  // Récupère les rendez-vous pour un professionnel spécifique
  getProRdv(proId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/rdv/pro/${proId}`);
  }

  // Récupère tous les rendez-vous pour un administrateur
  getAdminRdv(number: number): Observable<any[]> {
    return this.http.get<any[]>('/api/rdv/admin');
  }

  // Récupère tous les rendez-vous (Utilisé par l'admin pour voir tous les rendez-vous)
  getAllRdv(): Observable<any[]> {
    return this.http.get<any[]>('/api/rdv/all');
  }

  //
  bookRdv(RdvData: any): Observable<any> {
    // @ts-ignore
    return this.http.post('api/rdv/book');
  }
}

