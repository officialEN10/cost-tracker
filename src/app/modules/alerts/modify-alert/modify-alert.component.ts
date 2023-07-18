import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/entities/alert';
import { Category } from 'src/app/entities/category';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modify-alert',
  templateUrl: './modify-alert.component.html',
  styleUrls: ['./modify-alert.component.scss'],
})
export class ModifyAlertComponent implements OnInit {
  alertForm: FormGroup;
  categories: Category[] = [];
  userId: string | any;
  conditions = ['greater than', 'less than', 'equal to'];

  alertToUpdate: Alert;
  alertId: string;
  category: Category | any; //to save the current catg of the expense
  isLoading = false; // for spinner use
  error: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //we set loading to true when retrieving data
    this.isLoading = true;

    // we extract the expense id from the url
    this.alertId = this.route.snapshot.paramMap.get('id')!;

    //we get the alert values using it's id
    this.alertService.getAlert(this.alertId).subscribe((alert) => {
      this.alertToUpdate = alert;

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
                console.log('this.categories :', this.categories);
                console.log('this.alertToUpdate.categoryId :', this.alertToUpdate.categoryId);

                this.category = this.categories.find((category) => {
                  return category._id == this.alertToUpdate.categoryId;
                });
                console.log('this.category :', this.category);

                //we fill the form with data from the server
                this.alertForm = new FormGroup({
                  name: new FormControl(
                    this.alertToUpdate.name,
                    Validators.required
                  ),
                  condition: new FormControl(
                    this.alertToUpdate.condition,
                    Validators.required
                  ),
                  amount: new FormControl(
                    this.alertToUpdate.amount,
                    Validators.required
                  ),
                  message: new FormControl(
                    this.alertToUpdate.message,
                    Validators.required
                  ),
                  category: new FormControl(
                    this.category.name,
                    Validators.required
                  ),
                });
                console.log('expenseToUpdate: ', this.alertToUpdate);

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
    if (this.alertForm.valid) {
      let alertData = this.alertForm.value;
      let updatedAlert: Alert = {
        name: alertData.name,
        condition: alertData.condition,
        amount: alertData.amount,
        message: alertData.message,
        categoryId: alertData.category,
      };

      this.alertService.updateAlert(this.alertId, updatedAlert).subscribe(
        (newUpdatedAlert) => {
          console.log('New nweUpdatedAlert: ', newUpdatedAlert);
          this.router.navigate(['/alerts']);
        },
        (error) => {
          this.error = 'Login invalid: '+error.error.message +"\n.Please try again";
          console.error(error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/alerts']);
  }
}

