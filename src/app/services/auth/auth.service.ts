import { Injectable, inject } from '@angular/core';
import { api } from 'src/app/config/api';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private api = api.api

  constructor() { }

  login(email: string, password: string){
    return this.http.post(`${this.api}auth/login`, {
      email,
      password
    })
  }
}
