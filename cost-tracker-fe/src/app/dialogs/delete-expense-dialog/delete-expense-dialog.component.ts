import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-expense-dialog',
  templateUrl: './delete-expense-dialog.component.html',
  styleUrls: ['./delete-expense-dialog.component.scss'],
})
export class DeleteExpenseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public expenseConcept: string) {}
}
