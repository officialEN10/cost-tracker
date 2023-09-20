import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewReportsRoutingModule } from './overview-reports-routing.module';
import { OverviewReportsComponent } from './overview-reports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [OverviewReportsComponent],
  imports: [
    CommonModule,
    OverviewReportsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
    MatCardModule,
  ],
  exports: [OverviewReportsComponent],
})
export class OverviewReportsModule {}
