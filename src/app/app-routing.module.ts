import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeLayoutComponent } from './layouts/welcome-layout/welcome-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    component: WelcomeLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((e) => e.AuthRoutes),
    component: WelcomeLayoutComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
