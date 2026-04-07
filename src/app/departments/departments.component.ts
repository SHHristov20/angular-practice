import { Component, inject, signal, input, DestroyRef } from '@angular/core';
import { DepartmentService } from './department.service';
import { Department } from './department.model';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/confirm-dialog/dialog.service';
import { TableHeaderComponent } from '../shared/table/table-header/table-header.component';
import { OnInit } from '@angular/core';
import { DetailsRowComponent } from '../shared/table/details-row/details-row.component';
import { filter, getDetails, sort } from '../shared/utils/object.utils';
import { ActionsRowComponent } from '../shared/table/actions-row/actions-row.component';

@Component({
  selector: 'app-departments',
  imports: [
    FormsModule,
    MatPaginatorModule,
    TableHeaderComponent,
    DetailsRowComponent,
    ActionsRowComponent,
  ],
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
  departments = signal<Department[]>(this.departmentService.getAll());
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

      this.departments.set(
        sort<Department>(this.departmentService.getAll(), sortBy, sortDirection),
      );
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  onDelete(departmentId: number) {
    if (!this.departmentService.getById(departmentId)) return;
    const title = 'Delete Department';
    const message = `Are you sure you want to delete this department?
    ID: ${departmentId}
    Name: ${this.departmentService.getById(departmentId)!.name}`;
    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;
      this.departmentService.delete(departmentId);
      this.onFilterChange(this.currentFilters() ?? { property: '', value: '' });
    });
  }

  onFilterChange(filters: { property: string; value: string }) {
    this.currentFilters.set(filters);
    this.departments.set(
      filter<Department>(this.departmentService.getAll(), {
        property: filters.property as keyof Department,
        value: filters.value,
      }),
    );
  }
  onEdit(departmentId: number) {
    this.router.navigate(['/departments', 'edit', departmentId]);
  }

  getDetails(department: Department) {
    return getDetails<Department>(department);
  }
}
