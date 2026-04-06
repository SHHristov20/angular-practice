import { Component, inject, signal, input, computed, effect } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DialogService } from '../shared/confirm-dialog/dialog.service';

@Component({
  selector: 'app-employees',
  imports: [FormsModule, MatPaginatorModule, RouterLink, DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employees = input.required<Employee[]>();
  employeeService = inject(EmployeeService);
  dialogService = inject(DialogService);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  name = signal<string>('');
  department = signal<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  filteredEmployees = computed<Employee[]>(() => {
    if (!this.name() && !this.department()) {
      return this.employees();
    }

    return this.employees().filter((employee) => {
      const matchesName = this.name()
        ? employee.name.toLowerCase().includes(this.name().toLowerCase())
        : true;
      const matchesDepartment = this.department()
        ? employee.department.toLowerCase().includes(this.department().toLowerCase())
        : true;
      return matchesName && matchesDepartment;
    });
  });

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  onDelete(employeeId: number) {
    if (!this.employeeService.getEmployeeById(employeeId)) return;
    const title = 'Delete Employee';
    const message = `Are you sure you want to delete this employee?
    ID: ${employeeId}
    Name: ${this.employeeService.getEmployeeById(employeeId)!.name}`;

    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;

      this.employeeService.deleteEmployee(employeeId);
      this.router.navigate(['/employees'], {
        queryParamsHandling: 'preserve',
        onSameUrlNavigation: 'reload',
      });
    });
  }
}

export const resolveEmployees: ResolveFn<Employee[]> = (route: ActivatedRouteSnapshot) => {
  const employeeService = inject(EmployeeService);
  const sortBy = (route.queryParamMap.get('sortBy') as keyof Employee) || 'name';
  const direction = route.queryParamMap.get('sortDirection') as 'asc' | 'desc';

  employeeService.sortEmployees(sortBy, direction);

  return employeeService.employees;
};
