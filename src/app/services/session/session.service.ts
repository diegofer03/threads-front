import { Injectable, inject, signal } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private cookieService = inject(CookieService);
  user = signal<User | null>(null)

  constructor() { }

  saveToken(token: string){
    this.cookieService.set('token', token);
  }

  getToken(){
    return this.cookieService.get('token')
  }

  removeToken(){
    this.cookieService.delete('token')
  }

  isValid(){
    const token = this.getToken()
    if(!token) return false
    const decodeToken = jwtDecode<JwtPayload>(token)
    if(decodeToken && decodeToken.exp){
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodeToken.exp)
      const now = new Date()
      return tokenDate.getTime() > now.getTime()
    }
    return false
  }
}
