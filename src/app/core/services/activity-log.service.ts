import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ActivityLog, Page } from '../models';

const BASE = `${environment.apiUrl}/logs`;

@Injectable({ providedIn: 'root' })
export class ActivityLogService {
  private http = inject(HttpClient);

  getAll(page = 0, size = 20, search = ''): Observable<ApiResponse<Page<ActivityLog>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search && search.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http.get<ApiResponse<Page<ActivityLog>>>(BASE, { params });
  }
}
