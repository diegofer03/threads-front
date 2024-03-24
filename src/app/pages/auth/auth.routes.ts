import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () => import('./auth.component').then(c => c.AuthComponent),
    title: 'Threads'
  }
  // {path: 'login', pathMatch : 'full', redirectTo: ''},
] as Routes ;
