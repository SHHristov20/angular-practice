import { Routes, UrlTree } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.routes').then((m) => m.employeesRoutes),
  },
];
