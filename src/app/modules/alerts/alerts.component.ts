import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/entities/alert';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: Alert[];
  displayedColumns: string[] = [
    'Alert',
    'Condition',
    'Amount',
    'Message',
    'Status',
    'actions',
  ];

  userId: string | any;

  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.userService
          .getAlertsOfUser(this.userId)
          .subscribe((alerts) => (this.alerts = alerts));
      }
    });
  }

  modifyAlert(expenseId: string) {}
  deleteAlert(expenseId: string) {}
  addAlert() {}
}
