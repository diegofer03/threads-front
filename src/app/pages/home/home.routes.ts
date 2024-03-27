import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('./feed/feed.component').then(h => h.FeedComponent),
    title: 'Threads'
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(p => p.ProfileComponent),
    title: 'Profile'
  }
  // {path: 'login', pathMatch : 'full', redirectTo: ''},
] as Routes ;
