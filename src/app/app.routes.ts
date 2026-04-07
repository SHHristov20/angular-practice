import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.routes').then((m) => m.employeesRoutes),
  },
  {
    path: 'departments',
    loadChildren: () => import('./departments/departments.routes').then((m) => m.departmentsRoutes),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
