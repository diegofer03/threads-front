import { Injectable, inject } from '@angular/core';
import { api } from 'src/app/config/api';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { SessionService } from '../session/session.service';
import { Login } from 'src/app/models/auth.model';
import { User, UserUpdate } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private sessionService = inject(SessionService)
  private api = api.api


  constructor() { }

  login(email: string, password: string){
    return this.http.post<Login>(`${this.api}auth/login`, {
      email,
      password
    }).pipe(
      tap((response: Login) => {
        this.sessionService.saveToken(response.token)
        this.sessionService.user.set(response.user)
      })
    )
  }

  profile(id: string){
    return this.http.get<User>(`${this.api}users/${id}`)
  }

  updateProfile(id: string, payload: UserUpdate){
    return this.http.patch(`${api.api}users/${id}`, payload)
  }

  logout(){
    this.sessionService.removeToken()
  }
}
