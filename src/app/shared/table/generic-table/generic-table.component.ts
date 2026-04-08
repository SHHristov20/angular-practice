import { Component, input, output, signal, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { DetailsRowComponent } from '../details-row/details-row.component';
import { ActionsRowComponent } from '../actions-row/actions-row.component';
import { PageEvent } from '@angular/material/paginator';
import { filter, getDetails, sort } from '../../utils/object.utils';
import { BaseService } from '../../services/base.service';
import { DialogService } from '../../confirm-dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { TableColumn } from './TableColumn';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
  imports: [MatPaginatorModule, TableHeaderComponent, DetailsRowComponent, ActionsRowComponent],
})
export class GenericTableComponent<T extends { id: number; name: string; expanded?: boolean }> {
  columns = input<TableColumn<T>[]>([]);
  baseService = input.required<BaseService<T>>();
  data = signal<T[]>([]);
  pageSize = signal<number>(10);
  pageIndex = signal<number>(0);
  currentFilters = signal<{ property: keyof T; value: string } | null>(null);
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  dialogService = inject(DialogService);
  router = inject(Router);

  ngOnInit() {
    this.data.set(this.baseService().getAll());
    this.setupParamListener();
  }

  setupParamListener() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      const sortDirection = params['sortDirection'] || 'asc';
      const sortBy = params['sortBy'];

      this.data.set(sort<T>(this.baseService().getAll(), sortBy, sortDirection));
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  changePage(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  getDetails(item: T) {
    return getDetails<T>(item);
  }

  onFilterChange(filters: { property: keyof T; value: string } | null) {
    if (!filters) return;
    this.currentFilters.set(filters);
    this.data.set(
      filter<T>(this.baseService().getAll(), {
        property: filters.property as keyof T,
        value: filters.value,
      }),
    );
  }

  onDelete(itemId: number) {
    if (!this.baseService().getById(itemId)) return;
    const title = `Delete ${this.baseService().entityName}`;
    const message = `Are you sure you want to delete this ${this.baseService().entityName}?
    ID: ${itemId}
    Name: ${this.baseService().getById(itemId)!.name!}`;
    this.dialogService.openDialog(title, message).subscribe((confirmed) => {
      if (!confirmed) return;
      this.baseService().delete(itemId);
      this.onFilterChange(this.currentFilters());
    });
  }

  onEdit(itemId: number) {
    this.router.navigate([this.baseService().route, 'edit', itemId]);
  }
}
