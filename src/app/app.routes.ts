import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Threads',
    loadComponent: () => import('./pages/home/home.component').then(h => h.HomeComponent)
  }
];
