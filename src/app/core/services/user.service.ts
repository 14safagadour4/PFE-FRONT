import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AppUser, Page } from '../models';

const BASE = `${environment.apiUrl}/users`;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(status?: string, page = 0, size = 10): Observable<ApiResponse<Page<AppUser>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Page<AppUser>>>(BASE, { params });
  }

  validate(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${BASE}/${id}/validate`, {});
  }

  block(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${BASE}/${id}/block`, {});
  }

  unblock(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${BASE}/${id}/unblock`, {});
  }
}