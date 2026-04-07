import { Component, inject, signal, input, DestroyRef, computed } from '@angular/core';
import { EmployeeService } from './employee.service';
import { DepartmentService } from '../departments/department.service';
import { Employee } from './employee.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/confirm-dialog/dialog.service';
import { TableHeaderComponent } from '../shared/table/table-header/table-header.component';
import { OnInit } from '@angular/core';
import { DetailsRowComponent } from '../shared/table/details-row/details-row.component';
import { sort, filter } from '../shared/utils/object.utils';
import { getDetails } from '../shared/utils/object.utils';
import { ActionsRowComponent } from '../shared/table/actions-row/actions-row.component';

@Component({
  selector: 'app-employees',
  imports: [
    FormsModule,
    MatPaginatorModule,
    TableHeaderComponent,
    DetailsRowComponent,
    ActionsRowComponent,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employeeService = inject(EmployeeService);
  departmentService = inject(DepartmentService);
  dialogService = inject(DialogService);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  name = signal<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  activatedRoute = inject(ActivatedRoute);
  employees = signal<Employee[]>(this.employeeService.getAll());
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  currentFilters = signal<{ property: string; value: string } | null>(null);

  ngOnInit(): void {
    this.setupParamListener();
  }

  setupParamListener() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      const sortDirection = params['sortDirection'] || 'asc';
      const sortBy = params['sortBy'];

      this.employees.set(sort<Employee>(this.employeeService.getAll(), sortBy, sortDirection));
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  onDelete(employeeId: number) {
    if (!this.employeeService.getById(employeeId)) return;
    const title = 'Delete Employee';
    const message = `Are you sure you want to delete this employee?
    ID: ${employeeId}
    Name: ${this.employeeService.getById(employeeId)!.name}`;

    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;

      this.employeeService.delete(employeeId);
      this.onFilterChange(this.currentFilters() ?? { property: '', value: '' });
    });
  }

  onFilterChange(filters: { property: string; value: string }) {
    this.currentFilters.set(filters);
    this.employees.set(
      filter<Employee>(this.employeeService.getAll(), {
        property: filters.property as keyof Employee,
        value: filters.value,
      }),
    );
  }

  onEdit(employeeId: number) {
    if (!this.employeeService.getById(employeeId)) return;
    this.router.navigate(['/employees', 'edit', employeeId]);
  }

  getDetails(employee: Employee) {
    return getDetails<Employee>(employee);
  }
}
