import { EmployeesComponent } from './employees.component';
import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'new',
    component: EmployeeFormComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
  },
];
