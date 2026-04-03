import { EmployeesComponent, resolveEmployees } from './employees.component';
import { Routes } from '@angular/router';
import { NewEmployee } from './new-employee/new-employee';

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    resolve: {
      employees: resolveEmployees,
    },
    runGuardsAndResolvers: 'always',
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
