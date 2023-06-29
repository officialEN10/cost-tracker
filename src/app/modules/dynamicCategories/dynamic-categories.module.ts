import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DynamicCategoriesComponent } from './dynamic-categories.component';
import { DynamicCategoriesRoutingModule } from './dynamic-categories-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    DynamicCategoriesComponent,
    ExpensesComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    DynamicCategoriesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DynamicCategoriesModule {}
