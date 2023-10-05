import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loggedUserReducers } from './store/auth.reducers';

export const AuthRoutes: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(StoreModule.forFeature('Auth', loggedUserReducers)),
    ],
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
    ],
  },
];
