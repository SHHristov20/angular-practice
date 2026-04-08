import { Component, inject } from '@angular/core';
import { DepartmentService } from './department.service';
import { GenericTableComponent } from '../shared/table/generic-table/generic-table.component';

@Component({
  selector: 'app-departments',
  imports: [GenericTableComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent {
  departmentService = inject(DepartmentService);
}
