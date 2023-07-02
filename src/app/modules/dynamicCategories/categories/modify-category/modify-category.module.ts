import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyCategoryComponent } from './modify-category.component';
import { ModifyCategoryRoutingModule } from './modify-category-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ModifyCategoryComponent],
  imports: [
    CommonModule,
    ModifyCategoryRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ModifyCategoryModule {}
