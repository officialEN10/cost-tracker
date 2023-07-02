import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-alert-dialog',
  templateUrl: './delete-alert-dialog.component.html',
  styleUrls: ['./delete-alert-dialog.component.scss'],
})
export class DeleteAlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public alertName: string) {}
}
