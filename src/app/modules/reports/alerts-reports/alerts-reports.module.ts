import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsReportsRoutingModule } from './alerts-reports-routing.module';
import { AlertsReportsComponent } from './alerts-reports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AlertsReportsComponent],
  imports: [
    CommonModule,
    AlertsReportsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [AlertsReportsComponent]
})
export class AlertsReportsModule {}
