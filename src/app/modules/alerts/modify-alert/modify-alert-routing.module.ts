import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyAlertComponent } from './modify-alert.component';

const routes: Routes = [{ path: '', component: ModifyAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyAlertRoutingModule {}
