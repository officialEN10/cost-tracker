import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesReportsComponent } from './categories-reports.component';

const routes: Routes = [{ path: '', component: CategoriesReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesReportsRoutingModule {}
