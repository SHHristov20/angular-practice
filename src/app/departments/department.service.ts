import { Injectable } from '@angular/core';
import { Department, mockDepartments, NewDepartmentDto } from './department.model';
import { BaseService } from '../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService<Department, NewDepartmentDto> {
  constructor() {
    super(mockDepartments);
  }
}
