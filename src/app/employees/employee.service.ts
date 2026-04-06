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

  sortEmployees(sortBy: keyof Employee, direction: 'asc' | 'desc'): Employee[] {
    const sortedEmployees = this.employees.sort((a, b) => {
      const left = a[sortBy];
      const right = b[sortBy];

      let result = 0;

      if (typeof left === 'number' && typeof right === 'number') {
        result = left - right;
      } else if (left instanceof Date && right instanceof Date) {
        result = left.getTime() - right.getTime();
      } else {
        result = String(left).localeCompare(String(right));
      }

      return direction === 'asc' ? result : -result;
    });

    return sortedEmployees;
  }

  filterEmployees(filter: { property: keyof Employee; value: string }): Employee[] {
    return this.employees.filter((employee) => {
      const employeeValue = String(employee[filter.property]).toLowerCase();
      return employeeValue.includes(filter.value.toLowerCase());
    });
  }

  getDetails(employee: any) {
    const { expanded, ...rest } = employee;

    return Object.entries(rest).map(([key, value]) => ({
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      value: value instanceof Date ? formatDate(value, 'MM/dd/yyyy', 'en-US') : String(value),
    }));
  }
}
