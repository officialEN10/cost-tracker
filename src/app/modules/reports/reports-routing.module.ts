import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsParentComponent } from './reports-parent/reports-parent.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsParentComponent,
    children: [
      {
        path: '',
        redirectTo: 'categories-reports',
        pathMatch: 'full',
      },
      {
        path: 'overview-reports',
        loadChildren: () =>
          import('./overview-reports/overview-reports.module').then(
            (m) => m.OverviewReportsModule
          ),
      },
      {
        path: 'categories-reports',
        loadChildren: () =>
          import('./categories-reports/categories-reports.module').then(
            (m) => m.CategoriesReportsModule
          ),
      },
      {
        path: 'alerts-reports',
        loadChildren: () =>
          import('./alerts-reports/alerts-reports.module').then(
            (m) => m.AlertsReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
