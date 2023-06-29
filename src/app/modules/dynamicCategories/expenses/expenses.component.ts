import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';

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
    private expenseService: ExpenseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.userService
          .getExpensesOfUser(this.userId)
          .subscribe((expenses) => (this.expenses = expenses));
      }
    });
  }

  modifyExpense(expenseId: string) {}
  deleteExpense(expenseId: string) {}
  addExpense() {}
}
