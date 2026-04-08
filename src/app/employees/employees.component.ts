import { Component, inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import { GenericTableComponent } from '../shared/table/generic-table/generic-table.component';

@Component({
  selector: 'app-employees',
  imports: [GenericTableComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employeeService = inject(EmployeeService);
}
