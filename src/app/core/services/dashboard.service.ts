import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, DashboardStats, ActivityLog, Page } from '../models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) { }

  getStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${environment.apiUrl}/dashboard/stats`);
  }

  getLogs(page = 0, size = 10): Observable<ApiResponse<Page<ActivityLog>>> {
    return this.http.get<ApiResponse<Page<ActivityLog>>>(
      `${environment.apiUrl}/logs`,
      { params: new HttpParams().set('page', page).set('size', size) }
    );
  }
}