import { Routes } from '@angular/router';

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
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.routes').then((m) => m.departmentsRoutes),
  },
];
