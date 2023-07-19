import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsRoutingModule } from './alerts-routing.module';
import { AlertsComponent } from './alerts.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule,
    AlertsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class AlertsModule {}
