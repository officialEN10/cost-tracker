import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyCategoryComponent } from './modify-category.component';

const routes: Routes = [{ path: '', component: ModifyCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyCategoryRoutingModule {}
