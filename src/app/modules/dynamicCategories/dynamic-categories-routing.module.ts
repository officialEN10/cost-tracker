import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicCategoriesComponent } from './dynamic-categories.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicCategoriesRoutingModule {}
