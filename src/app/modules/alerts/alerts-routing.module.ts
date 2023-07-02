import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts.component';

const routes: Routes = [
  { path: '', component: AlertsComponent },
  {
    path: 'addAlert',
    loadChildren: () =>
      import('./add-alert/add-alert.module').then((m) => m.AddAlertModule),
  },
  {
    //we include the id of the expense
    path: 'modifyAlert/:id',
    loadChildren: () =>
      import('./modify-alert/modify-alert.module').then(
        (m) => m.ModifyAlertModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
