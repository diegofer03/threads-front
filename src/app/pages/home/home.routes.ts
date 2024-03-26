import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('./feed/feed.component').then(h => h.FeedComponent),
    title: 'Threads'
  }
  // {path: 'login', pathMatch : 'full', redirectTo: ''},
] as Routes ;
