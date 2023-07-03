import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.scss'],
})
export class ModifyExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  categories: Category[] = []; //to save the list of catgs for the dropdown
  category: Category | any; //to save the current catg of the expense
  userId: string | any;
  expenseId: string;
  expenseToUpdate: Expense;
  isLoading = false; // for spinner use

  today = new Date();
  private datePipe: DatePipe; //to convert the date to the right format YYYY/MM/DD

  constructor(
    private router: Router,
    private userService: UserService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) {
    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit(): void {
    //we set loading to true when retrieving data
    this.isLoading = true;

    // we extract the expense id from the url
    this.expenseId = this.route.snapshot.paramMap.get('id')!;

    //we get the expense values using its id
    this.expenseService.getExpense(this.expenseId).subscribe((expense) => {
      this.expenseToUpdate = expense;

      this.userService.user.subscribe(
        (loggedUser) => {
          if (loggedUser) {
            // we make sure loggedUser is not null
            this.userId = loggedUser._id;
            //we get all the categories of the user
            this.userService
              .getCategoriesOfUser(this.userId)
              .subscribe((categories) => {
                this.categories = categories;
                this.category = this.categories.find((category) => {
                  return category._id == this.expenseToUpdate.categoryId;
                });
                // console.log('this.category :', this.category);

                //we fill the form with data from the server
                this.expenseForm = new FormGroup({
                  concept: new FormControl(
                    this.expenseToUpdate.concept,
                    Validators.required
                  ),
                  amount: new FormControl(
                    this.expenseToUpdate.amount,
                    Validators.required
                  ),
                  date: new FormControl(
                    this.expenseToUpdate.date,
                    Validators.required
                  ),
                  category: new FormControl(
                    this.category.name,
                    Validators.required
                  ),
                });
                // console.log('expenseToUpdate: ', this.expenseToUpdate);

                this.isLoading = false; //when we got data, we stop showing the spinner and show the data
              });
          }
        },
        (err) => {
          this.isLoading = false;
        }
      );
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      let expenseData = this.expenseForm.value;
      let updatedExpense: Expense = {
        concept: expenseData.concept,
        amount: expenseData.amount,
        date: new Date(
          this.datePipe.transform(expenseData.date, 'yyyy-MM-dd')!
        ),
        categoryId: expenseData.category,
      };

      this.expenseService
        .updateExpense(this.expenseId, updatedExpense)
        .subscribe(
          (newUpdatedExpense) => {
            console.log(newUpdatedExpense);
            this.router.navigate(['/dynamic_categories/expenses']);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/expenses']);
  }
}
