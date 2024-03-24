import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'login'},
  {
    path: '',
    // canActivate: [redirectsGuard],
    component: AuthComponent,
    children: [
      {path: '', loadChildren: () => import('./pages/auth/auth.routes')},
    ]
  },
  {
    path: 'home',
    // canActivate: [tokenGuard],
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
