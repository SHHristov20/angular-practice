import { Injectable } from '@angular/core';
import { Employee, generateEmployees, NewEmployeeDto } from './employee.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly _employees: Employee[];

  constructor() {
    this._employees = generateEmployees(100);
  }

  get employees(): Employee[] {
    return this._employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this._employees.find((e) => e.id === id);
  }

  addEmployee(employee: NewEmployeeDto) {
    const newEmployee: Employee = {
      id: Math.max(...this._employees.map((e) => e.id)) + 1,
      ...employee,
    };
    this._employees.push(newEmployee);
  }

  editEmployee(id: number, updatedEmployee: NewEmployeeDto) {
    const employeeIndex = this._employees.findIndex((e) => e.id === id);
    if (employeeIndex !== -1) {
      this._employees[employeeIndex] = {
        id,
        ...updatedEmployee,
      };
    }
  }

  deleteEmployee(id: number) {
    const employeeIndex = this._employees.findIndex((e) => e.id === id);
    if (employeeIndex !== -1) {
      this._employees.splice(employeeIndex, 1);
    }
  }
}
