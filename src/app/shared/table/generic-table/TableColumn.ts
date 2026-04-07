export interface TableColumn<T> {
  label: string;
  property: keyof T;
  sortable?: boolean;
  filterable?: boolean;
}