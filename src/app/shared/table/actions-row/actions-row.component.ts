import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-actions-row',
  templateUrl: './actions-row.component.html',
  styleUrls: ['./actions-row.component.css'],
})
export class ActionsRowComponent {
  expanded = signal(false);
  expand = output<void>();
  edit = output<void>();
  delete = output<void>();

  onExpand() {
    this.expand.emit();
    this.expanded.set(!this.expanded());
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
