import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyExpenseComponent } from './modify-expense.component';

const routes: Routes = [{ path: '', component: ModifyExpenseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyExpenseRoutingModule {}
