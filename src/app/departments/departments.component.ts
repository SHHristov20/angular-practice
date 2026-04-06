import { Component, inject, signal, input, DestroyRef } from '@angular/core';
import { DepartmentService } from './department.service';
import { Department } from './department.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../shared/confirm-dialog/dialog.service';
import { TableHeaderComponent } from '../shared/table/table-header/table-header.component';
import { OnInit } from '@angular/core';
import { DetailsRowComponent } from '../shared/table/details-row/details-row.component';

@Component({
  selector: 'app-departments',
  imports: [FormsModule, MatPaginatorModule, RouterLink, TableHeaderComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  departmentService = inject(DepartmentService);
  dialogService = inject(DialogService);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  name = signal<string>('');
  department = signal<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  activatedRoute = inject(ActivatedRoute);
  departments = signal<Department[]>(this.departmentService.departments);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setupParamListener();
  }

  setupParamListener() {
    // const subscription = this.activatedRoute.queryParams.subscribe((params) => {
    //   const sortDirection = params['sortDirection'] || 'asc';
    //   const sortBy = params['sortBy'];
    //   this.employees.set(this.employeeService.sortEmployees(sortBy, sortDirection));
    // });
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  onDelete(employeeId: number) {
    // if (!this.employeeService.getEmployeeById(employeeId)) return;
    // const title = 'Delete Employee';
    // const message = `Are you sure you want to delete this employee?
    // ID: ${employeeId}
    // Name: ${this.employeeService.getEmployeeById(employeeId)!.name}`;
    // this.dialogService.openDialog(title, message).subscribe((confirmed) => {
    //   if (!confirmed) return;
    //   this.employeeService.deleteEmployee(employeeId);
    // });
  }

  onFilterChange(filter: { property: string; value: string }) {
    // this.employees.set(
    //   this.employeeService.filterEmployees({
    //     property: filter.property as keyof Employee,
    //     value: filter.value,
    //   }),
    // );
  }
}
