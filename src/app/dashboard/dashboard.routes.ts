import {Routes} from '@angular/router';


export const DashboardRoutes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/dashboard/dashboard.component')
        .then(c => c.DashboardComponent)
      }
    ]
  }
]
