import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicCategoriesComponent } from './dynamic-categories.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicCategoriesComponent,
  },
  {
    path: 'addExpense',
    loadChildren: () =>
      import('./expenses/add-expense/add-expense.module').then(
        (m) => m.AddExpenseModule
      ),
  },
  {
    //we include the id of the expense
    path: 'modifyExpense/:id',
    loadChildren: () =>
      import('./expenses/modify-expense/modify-expense.module').then(
        (m) => m.ModifyExpenseModule
      ),
  },
  {
    path: 'addCategory',
    loadChildren: () =>
      import('./categories/add-category/add-category.module').then(
        (m) => m.AddCategoryModule
      ),
  },
  {
    //we include the id of the expense
    path: 'modifyCategory/:id',
    loadChildren: () =>
      import('./categories/modify-category/modify-category.module').then(
        (m) => m.ModifyCategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicCategoriesRoutingModule {}
