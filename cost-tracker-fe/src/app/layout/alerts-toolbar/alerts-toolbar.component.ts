import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Subscription, filter } from 'rxjs';
import { Alert } from 'src/app/entities/alert';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-alerts-toolbar',
  templateUrl: './alerts-toolbar.component.html',
  styleUrls: ['./alerts-toolbar.component.scss'],
})
export class AlertsToolbarComponent implements OnInit, OnDestroy {
  triggeredAlerts: Alert[] = [];
  userId: string | any;
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((loggedUser) => {
      if (loggedUser) {
        // we make sure loggedUser is not null
        this.userId = loggedUser._id;
        this.getAlerts();
      }
    });

    this.subscription = this.alertService.triggeredAlerts$.subscribe(
      (alerts) => {
        this.triggeredAlerts = alerts;
      }
    );
  }

  getAlerts(): void {
    this.userService.getAlertsOfUser(this.userId).subscribe((alerts) => {
      this.alertService.checkAlerts(alerts);
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
