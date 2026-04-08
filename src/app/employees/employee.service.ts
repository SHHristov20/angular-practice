import { Injectable } from '@angular/core';
import { Employee, generateEmployees, NewEmployeeDto } from './employee.model';
import { BaseService } from '../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseService<Employee, NewEmployeeDto> {
  public entityName = 'Employee';
  public route = 'employees';

  constructor() {
    super(generateEmployees(100));
  }
}
