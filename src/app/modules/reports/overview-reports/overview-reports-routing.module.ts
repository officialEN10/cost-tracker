import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewReportsComponent } from './overview-reports.component';

const routes: Routes = [{ path: '', component: OverviewReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewReportsRoutingModule {}
