import { Component, input, output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-table-header-cell',
  standalone: true,
  imports: [],
  templateUrl: './table-header.component.html',
})
export class TableHeaderComponent<T> {
  label = input.required<string>();
  sortable = input<boolean>(false);
  sortDirection: 'asc' | 'desc' | null = null;
  filterable = input<boolean>(false);
  router = inject(Router);
  route = inject(ActivatedRoute);
  propertyName = input.required<keyof T>();
  filterChange = output<{ property: keyof T; value: string }>();
  sortCriteria: {
    property: keyof T;
    direction: 'asc' | 'desc';
  }[] = [];

  toggleSort() {
    const currentSort = this.route.snapshot.queryParamMap.get('sort');

    this.sortCriteria = currentSort
      ? currentSort.split(',').map((param) => {
          const [property, direction] = param.split(':');
          return { property: property as keyof T, direction: direction as 'asc' | 'desc' };
        })
      : [];

    const nextDirection =
      this.sortDirection === null ? 'asc' : this.sortDirection === 'asc' ? 'desc' : null;

    this.sortDirection = nextDirection;

    const property = this.propertyName();
    const index = this.sortCriteria.findIndex((c) => c.property === property);

    if (nextDirection) {
      if (index >= 0) {
        this.sortCriteria[index] = { property, direction: nextDirection };
      } else {
        this.sortCriteria = [...this.sortCriteria, { property, direction: nextDirection }];
      }
    } else if (index >= 0) {
      this.sortCriteria = this.sortCriteria.filter((c) => c.property !== property);
    }

    const sort = this.sortCriteria.map((c) => `${String(c.property)}:${c.direction}`).join(',');

    this.router.navigate([], {
      queryParams: { sort: sort || null },
      queryParamsHandling: 'merge',
    });
  }

  onFilterChange(value: string) {
    this.filterChange.emit({ property: this.propertyName(), value: value });
  }
}
