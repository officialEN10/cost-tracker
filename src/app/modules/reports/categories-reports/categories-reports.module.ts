import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesReportsRoutingModule } from './categories-reports-routing.module';
import { CategoriesReportsComponent } from './categories-reports.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { HighchartsChartModule } from 'highcharts-angular';
import { CategoriesPieChartComponent } from './categories-pie-chart/categories-pie-chart.component';

@NgModule({
  declarations: [CategoriesReportsComponent, CategoriesPieChartComponent],
  imports: [
    CommonModule,
    CategoriesReportsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
  ],
  exports: [CategoriesPieChartComponent]
})
export class CategoriesReportsModule {}
