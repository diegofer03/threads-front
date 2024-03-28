import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api } from 'src/app/config/api';
import { Thread, createThread } from 'src/app/models/threads-content.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private http = inject(HttpClient)
  private api = api.api

  constructor() { }

  getAll(){
    return this.http.get<Thread[]>(`${this.api}comments`)
  }

  createThread( payload: createThread){
    return this.http.post(`${this.api}comments`, payload)
  }

  getUsers(){
    return this.http.get<User[]>(`${this.api}users`)
  }
}
