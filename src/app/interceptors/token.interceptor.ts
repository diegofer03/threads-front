import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session/session.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private sessionService = inject(SessionService);
  private authService = inject(AuthService)
  private router = inject(Router);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const validToken = this.sessionService.isValid()

    if(validToken){
      const token = this.sessionService.getToken()
      const clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(clone);
    }else{
      this.authService.logout()
      this.router.navigate(['/login']);
      return next.handle(request)
    }
  }
}
