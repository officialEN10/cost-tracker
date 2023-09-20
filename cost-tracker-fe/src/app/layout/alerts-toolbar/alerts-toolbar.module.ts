import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'; // Add this import

import { AlertsToolbarComponent } from './alerts-toolbar.component';

@NgModule({
  declarations: [AlertsToolbarComponent],
  imports: [CommonModule, MatIconModule,MatToolbarModule],
  exports: [AlertsToolbarComponent],
})
export class AlertsToolbarModule {}
