import { Injectable } from '@angular/core';
import { Department, mockDepartments, NewDepartmentDto } from './department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly _departments: Department[] = mockDepartments;

  constructor() {}

  get departments(): Department[] {
    return this._departments;
  }

  getDepartmentById(id: number): Department | undefined {
    return this._departments.find((e) => e.id === id);
  }

  addDepartment(department: NewDepartmentDto) {
    const newDepartment: Department = {
      id: Math.max(...this._departments.map((e) => e.id)) + 1,
      createdAt: new Date(),
      ...department,
    };
    this._departments.push(newDepartment);
  }

  editDepartment(id: number, updatedDepartment: NewDepartmentDto) {
    const departmentIndex = this._departments.findIndex((e) => e.id === id);
    if (departmentIndex !== -1) {
      this._departments[departmentIndex] = {
        id,
        createdAt: this._departments[departmentIndex].createdAt,
        ...updatedDepartment,
      };
    }
  }

  deleteDepartment(id: number) {
    const departmentIndex = this._departments.findIndex((e) => e.id === id);
    if (departmentIndex !== -1) {
      this._departments.splice(departmentIndex, 1);
    }
  }
}
