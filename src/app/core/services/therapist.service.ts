import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Therapist } from '../../modules/admin/therapists/therapists.component';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Therapist[]> {
    return this.http.get<any>(`${this.apiUrl}/art-therapists`).pipe(
      map((response: any) => {
        if (response?.success && response?.data?.content && Array.isArray(response.data.content)) {
          return response.data.content.map((t: any) => ({
            ...t,
            // Align backend field 'artDiscipline' with frontend 'specialization'
            specialization: t.artDiscipline || 'Art-Thérapeute',
            joinedAt: t.createdAt
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
    return this.http.patch(`${this.apiUrl}/art-therapists/${id}/validate`, {});
  }

  refuse(id: number, reason: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/art-therapists/${id}/refuse`, { reason });
  }
}
