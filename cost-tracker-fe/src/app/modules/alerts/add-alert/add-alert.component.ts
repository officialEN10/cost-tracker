import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/entities/category';
import { Alert } from 'src/app/entities/alert';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-alert',
  templateUrl: './add-alert.component.html',
  styleUrls: ['./add-alert.component.scss'],
})
export class AddAlertComponent implements OnInit {
  alertForm: FormGroup;
  categories: Category[] = [];
  alerts: Alert[];
  userId: string | any;
  conditions = ['greater than', 'less than', 'equal to'];
  error: string;
  emptyMessage: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.alertForm = new FormGroup({
      name: new FormControl('', Validators.required),
      condition: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
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

  onSubmit() {
    if (this.alertForm.valid) {
      let alertData = this.alertForm.value;
      let alert: Alert = {
        name: alertData.name,
        condition: alertData.condition,
        amount: alertData.amount,
        message: alertData.message,
        categoryId: alertData.category,
      };

      this.alertService.createAlert(alert).subscribe(
        (alert) => {
          console.log('New alert: ', alert);
          this.userService.getAlertsOfUser(this.userId).subscribe((alerts) => {
            this.alertService.checkAlerts(alerts);
          });
          this.router.navigate(['/alerts']);
        },
        (error) => {
          this.error = 'Error: ' + error.error.message + '\n.Please try again';
          console.error(error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/alerts']);
  }
}
