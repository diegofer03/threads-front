import { Injectable, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private cookieService = inject(CookieService);
  user = signal({})

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

}
