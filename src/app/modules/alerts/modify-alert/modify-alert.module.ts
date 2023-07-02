import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModifyAlertComponent } from './modify-alert.component';
import { ModifyAlertRoutingModule } from './modify-alert-routing.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ModifyAlertComponent],
  imports: [
    CommonModule,
    ModifyAlertRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    TextFieldModule,
    MatProgressSpinnerModule,
  ],
})
export class ModifyAlertModule {}
