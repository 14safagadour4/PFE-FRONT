import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Specialist } from '../../features/specialists/specialists.component';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Specialist[]> {
    return this.http.get<any>(`${this.apiUrl}/specialists`).pipe(
      map((response: any) => {
        console.log('Réponse brute:', response);

        // Cas 1: response.data.content (pagination)
        if (response?.success && response?.data?.content && Array.isArray(response.data.content)) {
          return response.data.content;
        }

        // Cas 2: response.data est un tableau
        if (response?.success && Array.isArray(response.data)) {
          return response.data;
        }

        // Cas 3: response.data est un objet (clés = ids, valeurs = spécialistes)
        if (response?.success && response?.data && typeof response.data === 'object') {
          const specialistsArray = Object.values(response.data);
          if (specialistsArray.length > 0) {
            console.log('Objet converti en tableau:', specialistsArray);
            return specialistsArray;
          }
        }

        // Cas 4: response est directement un tableau
        if (Array.isArray(response)) {
          return response;
        }

        console.warn('Aucun tableau trouvé dans la réponse');
        return [];
      }),
      catchError((err: any) => {
        console.error('Erreur dans le service:', err);
        return of(this.mockData()); // Retourne les données mock en cas d'erreur
      })
    );
  }

  // Ajoute cette méthode pour les données mock
  private mockData(): Specialist[] {
    return [
      { id: 1, firstName: 'Amira', lastName: 'Ben Salah', email: 'amira@cartas.tn', specialty: 'Psychologue', status: 'PENDING', createdAt: '2026-01-10' },
      { id: 2, firstName: 'Karim', lastName: 'Mansour', email: 'karim@cartas.tn', specialty: 'Thérapeute', status: 'VALIDATED', validatedAt: '2026-02-01', createdAt: '2026-01-05' },
      { id: 3, firstName: 'Sonia', lastName: 'Trabelsi', email: 'sonia@cartas.tn', specialty: 'Coach', status: 'PENDING', createdAt: '2026-02-20' },
      { id: 4, firstName: 'Nour', lastName: 'Gharbi', email: 'nour@cartas.tn', specialty: 'Nutritionniste', status: 'REJECTED', createdAt: '2025-12-15' },
    ];
  }

  validate(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/specialists/${id}/validate`, {});
  }

  reject(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/specialists/${id}/reject`, {});
  }
}