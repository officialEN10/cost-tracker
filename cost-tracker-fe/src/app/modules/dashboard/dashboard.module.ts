import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OverviewReportsModule } from '../reports/overview-reports/overview-reports.module';
import { CategoriesReportsModule } from '../reports/categories-reports/categories-reports.module';
import { AlertsReportsModule } from '../reports/alerts-reports/alerts-reports.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    OverviewReportsModule,
    CategoriesReportsModule,
    AlertsReportsModule,
    FlexLayoutModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
