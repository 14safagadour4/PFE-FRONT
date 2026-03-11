import { CanActivateFn } from '@angular/router';

export const registrationGuard: CanActivateFn = (route, state) => {
  return true;
};
