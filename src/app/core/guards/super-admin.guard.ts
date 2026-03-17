import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const superAdminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('cartas_token');
  const userStr = localStorage.getItem('cartas_user');

  console.log('Guard check — token:', !!token, '— user:', userStr); // ← debug

  if (!token) return router.createUrlTree(['/admin/authSuper/login']);

  // Temporaire : si token existe → laisse passer !
  return true;
};
