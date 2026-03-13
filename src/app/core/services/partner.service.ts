import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, Partner, Role, CreatePartnerRequest, Page } from '../models';

const BASE = `${environment.apiUrl}/super-admin/partners`;

@Injectable({ providedIn: 'root' })
export class PartnerService {
  constructor(private http: HttpClient) { }

  getAll(page = 0, size = 10): Observable<ApiResponse<Page<Partner>>> {
    return this.http.get<ApiResponse<Page<Partner>>>(BASE,
      { params: new HttpParams().set('page', page).set('size', size) });
  }

  getRoles(): Observable<ApiResponse<Role[]>> {
    return this.http.get<ApiResponse<Role[]>>(`${BASE}/roles`);
  }

  create(req: CreatePartnerRequest): Observable<ApiResponse<Partner>> {
    return this.http.post<ApiResponse<Partner>>(BASE, req);
  }

  updateRole(id: number, roleId: number): Observable<ApiResponse<Partner>> {
    return this.http.patch<ApiResponse<Partner>>(
      `${BASE}/${id}/role`, {}, { params: new HttpParams().set('roleId', roleId) });
  }

  toggle(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${BASE}/${id}/toggle`, {});
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${BASE}/${id}`);
  }
}