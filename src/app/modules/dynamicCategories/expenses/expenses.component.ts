import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteExpenseDialogComponent } from 'src/app/dialogs/delete-expense-dialog/delete-expense-dialog.component';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { CsvExportService } from 'src/app/shared/csv-export/csv-export.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[];
  displayedColumns: string[] = [
    'date',
    'concept',
    'category',
    'amount',
    'attachment',
    'actions',
  ];

  userId: string | any;

  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
    private attachmentService: AttachmentService,
    private csvExportService: CsvExportService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.getExpenses();
      }
    });
  }

  getExpenses(): void {
    this.userService
      .getExpensesOfUser(this.userId)
      .subscribe((expenses) => (this.expenses = expenses));
  }

  addExpense() {
    this.router.navigate(['/dynamic_categories/expenses/addExpense']);
  }

  modifyExpense(expenseId: string) {
    this.router.navigate([
      '/dynamic_categories/expenses/modifyExpense',
      expenseId,
    ]);
  }

  deleteExpense(expenseId: string, expenseConcept: string) {
    const dialogRef = this.dialog.open(DeleteExpenseDialogComponent, {
      data: expenseConcept,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService.deleteExpense(expenseId).subscribe((expense) => {
          this.getExpenses(); //after deleting the expense, we refresh our list of expenses to get the latest changes
        });
      } else {
        //we dont do anything when dialog is closed
      }
    });
  }

  public downloadAttachment(idAttachment: string, fileName: string) {
    this.attachmentService
      .getAttachment(idAttachment)
      .subscribe((attachment) => {
        const fileExt = attachment.fileName.split('.').pop(); //we extract the file type from the file name
        fileName += '.' + fileExt; // we add it to the file name
        //we serve the attachment to the user
        this.attachmentService
          .serveAttachment(idAttachment)
          .subscribe((blob) => {
            this.attachmentService.createAndDownloadFile(fileName, blob);
          });
      });
  }

  exportTable() {
    let data = this.expenses.map((row) => ({
      "Date": row.date,
      "Concept": row.concept,
      "Category": row.categoryId,
      "Amount": row.amount,
    }));

    this.csvExportService.downloadCSV(data, 'expenses.csv');
  }
}
