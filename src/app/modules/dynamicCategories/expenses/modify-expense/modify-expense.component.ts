import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { Expense } from 'src/app/entities/expense';
import { ExpenseService } from 'src/app/services/expenses/expense.service';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe } from '@angular/common';
import { Attachment } from 'src/app/entities/attachment';
import { AttachmentService } from 'src/app/services/attachment/attachment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  attachment: Attachment | null;
  fileToDelete: string | null = null; //to delete file on form submission

  today = new Date();
  selectedFile: File | null = null;

  private datePipe: DatePipe; //to convert the date to the right format YYYY/MM/DD
  error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private attachmentService: AttachmentService,
    private snackBar: MatSnackBar
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
      //if expense has attachment id, we get the attachment and store it in the local var attachment
      if (this.expenseToUpdate.attachment) {
        this.attachmentService
          .getAttachment(this.expenseToUpdate.attachment)
          .subscribe((attachment) => {
            this.attachment = attachment;
            console.log('attachment: ', attachment);
          });
      } else {
        //if expense don't have attachment id, we save null
        this.attachment = null;
      }

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
                //we find the current category of the expense
                this.category = this.categories.find((category) => {
                  return category._id == this.expenseToUpdate.categoryId;
                });

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
                    this.category ? this.category.name : null,
                    Validators.required
                  ),
                });
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

  onSubmit(event: Event) {
    event.preventDefault();
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

      //if there's a file marked for deletion, we delete it first
      if (this.fileToDelete) {
        this.attachmentService.deleteAttachment(this.fileToDelete).subscribe(
          () => {
            this.snackBar.open('Attachment deleted', 'Close', {
              duration: 2000,
            });
            this.attachment = null; // to reshow the attach file option

            this.updateExpense(updatedExpense);
          },
          (error) => {
            this.snackBar.open('Failed to delete attachment', 'Close', {
              duration: 2000,
            });

            this.error = 'Error: ' + error.error.message + '';
            console.error(error);
          }
        );
      } else {
        this.updateExpense(updatedExpense);
      }
    }
  }

  updateExpense(updatedExpense: Expense) {
    //to send a file, we have to send it as formData
    let formData: FormData = new FormData();
    //if we have a new file selected, we append it to the formData
    if (this.selectedFile) {
      formData.append(
        'attachment', //key
        this.selectedFile, //file
        this.selectedFile.name //file name
      );
    }
    //if we have the same attachment as before, we only send the id
    else if (this.attachment) {
      const attachmentId = this.attachment?._id ?? '';
      formData.append('attachment', attachmentId);
    }

    //we iterate over the expense keys and we append them to the formdata that we are going to send
    Object.keys(updatedExpense).forEach((key) => {
      if (key === 'amount') {
        //amount isn't a string, so we convert it to a string first
        formData.append(key, (updatedExpense as any)[key].toString());
      } else {
        formData.append(key, (updatedExpense as any)[key]);
      }
    });

    this.expenseService.updateExpense(this.expenseId, formData).subscribe(
      (newUpdatedExpense) => {
        console.log(newUpdatedExpense);
        this.router.navigate(['/dynamic_categories/expenses']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCancel() {
    this.router.navigate(['/dynamic_categories/expenses']);
  }

  downloadAttachment() {
    console.log('downloadAttachment: ', this.expenseToUpdate.attachment);
    const attachmentId = this.expenseToUpdate.attachment;
    let fileName = this.expenseToUpdate.concept + '_attachment';
    if (attachmentId)
      this.attachmentService
        .getAttachment(attachmentId)
        .subscribe((attachment) => {
          const fileExt = attachment.fileName.split('.').pop(); //we extract the file type from the file name
          fileName += '.' + fileExt; // we add it to the file name
          //we serve the attachment to the user
          this.attachmentService
            .serveAttachment(attachmentId)
            .subscribe((blob) => {
              this.attachmentService.createAndDownloadFile(fileName, blob);
            });
        });
  }

  removeAttachment() {
    if (this.expenseToUpdate.attachment) {
      this.fileToDelete = this.expenseToUpdate.attachment;
      this.attachment = null; // Locally remove the attachment but do not delete yet from server
      this.snackBar.open('Attachment marked for deletion', 'Close', {
        duration: 2000,
      });
    }
  }

  onFileChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
}
