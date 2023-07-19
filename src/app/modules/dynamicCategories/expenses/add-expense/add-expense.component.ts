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
  selectedFile: File | null = null;
  error: string;
  emptyMessage: string;

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
          .subscribe((categories) => {
            this.categories = categories.filter(
              (category) => category.name.toLowerCase() !== 'uncategorized'
            );
            if (this.categories.length === 0) {
              this.emptyMessage =
                'No categories available. Please create categories first to be able to create alerts.';
            }
          });
      }
    });
  }

  onFileChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
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
        userId: this.userId,
      };

      //to send a file, we have to send it as formData
      let formData: FormData = new FormData();
      if (this.selectedFile) {
        formData.append(
          'attachment', //key
          this.selectedFile, //file
          this.selectedFile.name //file name
        );
      }

      //we iterate over the expense keys and we append them to the formdata that we are going to send
      Object.keys(expense).forEach((key) => {
        if (key === 'amount') {
          //amount isn't a string, so we convert it to a string first
          formData.append(key, (expense as any)[key].toString());
        } else {
          formData.append(key, (expense as any)[key]);
        }
      });

      this.expenseService.createExpense(formData).subscribe(
        (expense) => {
          console.log('New Expense: ', expense);
          this.router.navigate(['/dynamic_categories/expenses']);
        },
        (error) => {
          this.error = 'Error: ' + error.error.message + '';
          console.error(error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/expenses']);
  }
}
