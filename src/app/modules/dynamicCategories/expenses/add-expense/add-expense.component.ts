import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  categories: Category[] = [];
  userId: string | any;
  today = new Date();
  private datePipe: DatePipe; //to convert the date to the right format YYYY/MM/DD

  constructor(
    private router: Router,
    private userService: UserService,
    private expenseService: ExpenseService
  ) {
    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      concept: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        //we get all the categories of the user
        this.userService
          .getCategoriesOfUser(this.userId)
          .subscribe((categories) => (this.categories = categories));
      }
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      let expenseData = this.expenseForm.value;
      let expense: Expense = {
        concept: expenseData.concept,
        amount: expenseData.amount,
        date: new Date(
          this.datePipe.transform(expenseData.date, 'yyyy-MM-dd')!
        ),
        categoryId: expenseData.category,
      };

      this.expenseService.createExpense(expense).subscribe(
        (expense) => {
          console.log('New Expense: ', expense);
          this.router.navigate(['/dynamic_categories']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories']);
  }
}
