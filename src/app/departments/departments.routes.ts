import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentsComponent } from './departments.component';
import { Routes } from '@angular/router';

export const departmentsRoutes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
  },
  {
    path: 'new',
    component: DepartmentFormComponent,
  },
  {
    path: 'edit/:id',
    component: DepartmentFormComponent,
  }
];
