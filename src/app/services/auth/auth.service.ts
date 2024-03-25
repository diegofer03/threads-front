import { Injectable, inject } from '@angular/core';
import { api } from 'src/app/config/api';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private sessionService = inject(SessionService)
  private api = api.api


  constructor() { }

  login(email: string, password: string){
    return this.http.post(`${this.api}auth/login`, {
      email,
      password
    }).pipe(
      tap((response: any) => {
        this.sessionService.saveToken(response.token)
        this.sessionService.user.set(response.user)
      })
    )
  }
}
