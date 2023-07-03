import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteExpenseDialogComponent } from 'src/app/dialogs/delete-expense-dialog/delete-expense-dialog.component';

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
    'actions',
  ];

  userId: string | any;

  constructor(
    private userService: UserService,
    private expenseService: ExpenseService,
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
}
