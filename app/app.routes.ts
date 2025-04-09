import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/dashboard/home/home.component').then(m => m.HomeComponent)
  },
  {
  path: 'verify',
  loadComponent: () =>
    import('./features/auth/verify/verify.component').then(m => m.VerifyComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
  },
];
