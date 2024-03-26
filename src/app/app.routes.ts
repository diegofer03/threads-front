import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { redirectGuard } from './guards/redirect/redirect.guard';
import { tokenGuard } from './guards/token/token.guard';

export const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'login'},
  {
    path: '',
    canActivate: [redirectGuard],
    component: AuthComponent,
    children: [
      {path: '', loadChildren: () => import('./pages/auth/auth.routes')},
    ]
  },
  {
    path: '',
    canActivate: [tokenGuard],
    component: HomeComponent,
    children: [
      {path: '', loadChildren: () => import('./pages/home/home.routes')},
    ]
  },

  {
    path: '**',
    redirectTo: ''
  },
];
