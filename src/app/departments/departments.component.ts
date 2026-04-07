import { Component, inject } from '@angular/core';
import { DepartmentService } from './department.service';
import { GenericTableComponent } from '../shared/table/generic-table/generic-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  imports: [GenericTableComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent {
  departmentService = inject(DepartmentService);
  router = inject(Router);

  onEdit(departmentId: number) {
    this.router.navigate(['/departments', 'edit', departmentId]);
  }
}
