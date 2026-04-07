import { Component, inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import { GenericTableComponent } from '../shared/table/generic-table/generic-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  imports: [GenericTableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);

  onEdit(employeeId: number) {
    this.router.navigate(['/employees', 'edit', employeeId]);
  }
}
