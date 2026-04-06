import { Component, inject, signal, input, DestroyRef } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../shared/confirm-dialog/dialog.service';
import { TableHeaderComponent } from '../shared/table/table-header/table-header.component';
import { OnInit } from '@angular/core';
import { DetailsRowComponent } from '../shared/table/details-row/details-row.component';
import { sort, filter } from '../shared/utils/object.utils';
import { getDetails } from '../shared/utils/object.utils';

@Component({
  selector: 'app-employees',
  imports: [FormsModule, MatPaginatorModule, RouterLink, TableHeaderComponent, DetailsRowComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employeeService = inject(EmployeeService);
  dialogService = inject(DialogService);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  name = signal<string>('');
  department = signal<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  activatedRoute = inject(ActivatedRoute);
  employees = signal<Employee[]>(this.employeeService.getAll());
  destroyRef = inject(DestroyRef);

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
    });
  }

  onFilterChange(filters: { property: string; value: string }) {
    this.employees.set(
      filter<Employee>(this.employeeService.getAll(), {
        property: filters.property as keyof Employee,
        value: filters.value,
      }),
    );
  }

  getDetails(employee: Employee) {
    return getDetails<Employee>(employee);
  }
}
