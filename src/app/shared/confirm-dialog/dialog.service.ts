import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogRef = inject(MatDialog);

  openDialog(title: string, message: string) {
    return this.dialogRef
      .open(ConfirmDialogComponent, {
        data: {
          title: title,
          message: message,
        },
      })
      .afterClosed();
  }
}
