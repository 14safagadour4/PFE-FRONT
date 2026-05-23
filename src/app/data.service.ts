import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // URL complète du backend
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getHelloMessage(): Observable<any> {
    // Appelle directement le backend sur le port 8080
    return this.http.get(`${this.apiUrl}/auth/status`);
  }
}