import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteAlertDialogComponent } from 'src/app/dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { Alert } from 'src/app/entities/alert';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { CsvExportService } from 'src/app/shared/csv-export/csv-export.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];
  displayedColumns: string[] = [
    'Alert',
    'Condition',
    'Amount',
    'Message',
    'Status',
    'actions',
  ];

  userId: string | any;
  error: string;
  emptyMessage: string;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private csvExportService: CsvExportService,
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
    this.userService.getAlertsOfUser(this.userId).subscribe((alerts) => {
      this.alertService.checkAlerts(alerts);
      this.alerts = alerts;
      if (this.alerts.length == 0) {
        //if the user has no alerts, i show a message that the user should create an alert
        this.emptyMessage =
          "You don't have any alerts yet. Create alerts by clicking the 'Add Alert' button.";
      } else {
        this.emptyMessage = '';
      }
    });
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
        this.alertService.deleteAlert(alertId).subscribe(
          (alert) => {
            console.log('deleted alert: ', alert);
            this.getAlerts(); //after deleting the alert, we refresh our list of alerts to get the latest changes
          },
          (error) => {
            this.error =
              'Error: ' + error.error.message + '\n.Please try again';
            console.error(error);
          }
        );
      } else {
        //we dont do anything when dialog is closed
      }
    });
  }

  exportTable() {
    //we only export if there are alerts
    if (this.alerts.length !== 0) {
      let data = this.alerts.map((row) => ({
        Alert: row.name,
        Condition: row.condition,
        Amount: row.amount,
        Message: row.message,
        Status: row.status,
      }));

      this.csvExportService.downloadCSV(data, 'alerts.csv');
    }
  }
}
