import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { api } from 'src/app/config/api';
import { Thread } from 'src/app/models/threads-content.model';

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
}
