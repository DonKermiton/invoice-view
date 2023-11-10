import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (c) => c.LoginComponent,
          ),
        data: {
          hideFooter: true,
        },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (comp) => comp.RegisterComponent,
          ),
        data: {
          hideFooter: true,
        },
      },
    ],
  },
];
