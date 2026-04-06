import { EmployeesComponent } from './employees.component';
import { Routes } from '@angular/router';
import { NewEmployee } from './new-employee/new-employee';

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'new',
    component: NewEmployee,
  },
  {
    path: 'edit/:id',
    component: NewEmployee,
  },
];
