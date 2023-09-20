import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlertComponent } from './add-alert.component';

const routes: Routes = [{ path: '', component: AddAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlertRoutingModule {}
