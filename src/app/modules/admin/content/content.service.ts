import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  totalLessons: number;
  authorName: string;
  isPublished: boolean;
  contentType: string;
  category?: {
    id: number;
    name: string;
  };
  lessons?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost:8080/api/learning';

  constructor(private http: HttpClient) { }

  getModules(): Observable<LearningModule[]> {
    return this.http.get<any>(`${this.apiUrl}/modules`).pipe(
      map(response => response.data)
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/categories`).pipe(
      map(response => response.data)
    );
  }

  createModule(module: Partial<LearningModule>): Observable<LearningModule> {
    return this.http.post<LearningModule>(`${this.apiUrl}/modules`, module);
  }

  togglePublish(moduleId: number, isPublished: boolean): Observable<any> {
    // On peut utiliser un endpoint PATCH pour mettre à jour uniquement le statut
    return this.http.patch(`${this.apiUrl}/modules/${moduleId}/publish`, { isPublished });
  }

  deleteModule(moduleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/modules/${moduleId}`);
  }
}
