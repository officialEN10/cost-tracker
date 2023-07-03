import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicCategoriesParentComponent } from './dynamic-categories-parent/dynamic-categories-parent.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicCategoriesParentComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'expenses',
      //   pathMatch: 'full',
      // },
      {
        path: 'expenses',
        component: ExpensesComponent,
      },
      {
        path: 'category',
        component: CategoriesComponent,
      },
    ],
  },
  {
    path: 'expenses/addExpense',
    loadChildren: () =>
      import('./expenses/add-expense/add-expense.module').then(
        (m) => m.AddExpenseModule
      ),
  },
  {
    path: 'expenses/modifyExpense/:id',
    loadChildren: () =>
      import('./expenses/modify-expense/modify-expense.module').then(
        (m) => m.ModifyExpenseModule
      ),
  },
  {
    path: 'category/addCategory',
    loadChildren: () =>
      import('./categories/add-category/add-category.module').then(
        (m) => m.AddCategoryModule
      ),
  },
  {
    path: 'category/modifyCategory/:id',
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
