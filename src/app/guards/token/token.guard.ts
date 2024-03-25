import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

export const tokenGuard: CanActivateFn = (route, state) => {
  const token = inject(SessionService).getToken()
  const router = inject(Router)
  if(!token) router.navigate(['/login'])
  return true;
};
