import { Component, input, output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-header-cell',
  standalone: true,
  imports: [],
  templateUrl: './table-header.component.html',
})
export class TableHeaderComponent {
  label = input.required<string>();
  sortable = input<boolean>(false);
  sortDirection: 'asc' | 'desc' = 'desc';
  filterable = input<boolean>(false);
  router = inject(Router);
  route = inject(ActivatedRoute);
  propertyName = input<string>('');
  filterChange = output<{ property: string; value: string }>();

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.router.navigate([], {
      queryParams: { sortBy: this.propertyName(), sortDirection: this.sortDirection },
    });
  }

  onFilterChange(value: string) {
    this.filterChange.emit({ property: this.propertyName(), value: value });
  }
}
