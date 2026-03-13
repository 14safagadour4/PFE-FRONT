import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

// Empêche d'accéder à /register si SA déjà enregistré
export const registrationGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.checkStatus().pipe(
    map(r => r.data ? router.createUrlTree(['/login']) : true),
    catchError(() => of(true))
  );
};
