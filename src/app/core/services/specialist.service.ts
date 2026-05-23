import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Specialist } from '../../modules/admin/specialists/specialists.component';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Specialist[]> {
    return this.http.get<any>(`${this.apiUrl}/specialists`).pipe(
      map((response: any) => {
        if (response?.success && response?.data?.content && Array.isArray(response.data.content)) {
          return response.data.content.map((s: any) => ({
            ...s,
            joinedAt: s.createdAt
          }));
        }
        return [];
      }),
      catchError((err: any) => {
        console.error('Erreur dans le service:', err);
        return of([]);
      })
    );
  }

  validate(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/specialists/${id}/validate`, {});
  }

  refuse(id: number, reason: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/specialists/${id}/refuse`, { reason });
  }
}
