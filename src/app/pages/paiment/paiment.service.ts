import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaimentService {

  private API_URL = 'http://localhost:4000'; 

  constructor(private http: HttpClient) { }

  createPaimentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.API_URL}/create-paiment-intent`, { amount });
  }
}
