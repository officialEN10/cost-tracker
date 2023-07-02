import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteAlertDialogComponent } from 'src/app/dialogs/delete-alert-dialog/delete-alert-dialog.component';
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
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.getAlerts();
      }
    });
  }
  getAlerts(): void {
    this.userService
      .getAlertsOfUser(this.userId)
      .subscribe((alerts) => (this.alerts = alerts));
  }

  addAlert() {
    this.router.navigate(['/alerts/addAlert']);
  }

  modifyAlert(alertId: string) {
    this.router.navigate(['/alerts/modifyAlert', alertId]);
  }

  deleteAlert(alertId: string, alertName: string) {
    const dialogRef = this.dialog.open(DeleteAlertDialogComponent, {
      data: alertName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.alertService.deleteAlert(alertId).subscribe((alert) => {
          this.getAlerts(); //after deleting the alert, we refresh our list of alerts to get the latest changes
        });
      } else {
        //we dont do anything when dialog is closed
      }
    });
  }
}
