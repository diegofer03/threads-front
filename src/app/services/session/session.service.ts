import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  cookieService = inject(CookieService);

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
