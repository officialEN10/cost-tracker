import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsReportsComponent } from './alerts-reports.component';

const routes: Routes = [{ path: '', component: AlertsReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsReportsRoutingModule {}
