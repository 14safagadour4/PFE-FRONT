import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../models';

const TOKEN_KEY = 'cartas_token';
const USER_KEY = 'cartas_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  // ── Signals ──────────────────────────────────────
  currentUser = signal<AuthUser | null>(this.loadUser());
  isLoggedIn = computed(() => !!this.currentUser());
  isSuperAdmin = computed(() => this.currentUser()?.role === 'SUPER_ADMIN');
  theme = signal<'dark' | 'light'>(this.currentUser()?.preferredTheme ?? 'dark');

  constructor(private http: HttpClient, private router: Router) {
    // Applique le thème sur <html>
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  // ── HTTP ─────────────────────────────────────────
  checkStatus(): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(`${this.api}/status`);
  }

  register(req: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.api}/register`, req)
      .pipe(tap(r => { if (r.success) this.persist(r.data); }));
  }

  login(req: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.api}/login`, req)
      .pipe(tap(r => { if (r.success) this.persist(r.data); }));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['admin/login']);
  }

  getToken(): string | null { return localStorage.getItem(TOKEN_KEY); }
  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Erreur parsing user:', e);
      return null;
    }
  }
  // Dans auth.service.ts
  getUserFromToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Décoder le token JWT (partie payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        firstName: payload.firstName || payload.sub?.split('@')[0] || '',
        lastName: payload.lastName || '',
        email: payload.sub || payload.email || '',
        preferredTheme: payload.preferredTheme || 'dark',
        role: payload.role || '',
        id: payload.id || payload.userId
      };
    } catch (e) {
      console.error('Erreur décodage token:', e);
      return null;
    }
  }
  toggleTheme(): void {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }

  // ── Helpers ──────────────────────────────────────
  private persist(data: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    this.currentUser.set(data.user);
    this.theme.set(data.user.preferredTheme);
  }

  private loadUser(): AuthUser | null {
    try { return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'); }
    catch { return null; }
  }
}


