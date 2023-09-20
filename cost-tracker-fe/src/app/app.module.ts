import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './layout/header/header.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteExpenseDialogComponent } from './dialogs/delete-expense-dialog/delete-expense-dialog.component';
import { DeleteCategoryDialogComponent } from './dialogs/delete-category-dialog/delete-category-dialog.component';
import { DeleteAlertDialogComponent } from './dialogs/delete-alert-dialog/delete-alert-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { HighchartsChartModule } from 'highcharts-angular';
import { FooterModule } from './layout/footer/footer.module';
import { MatIconModule } from '@angular/material/icon';
import { AlertsToolbarModule } from './layout/alerts-toolbar/alerts-toolbar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TokenInterceptor } from './guards/token.interceptor';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    DeleteExpenseDialogComponent,
    DeleteCategoryDialogComponent,
    DeleteAlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    FooterModule,
    HeaderModule,
    MatTabsModule,
    MatDialogModule,
    HighchartsChartModule,
    MatIconModule,
    MatToolbarModule,
    AlertsToolbarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duration in milliseconds
      positionClass: 'toast-top-right', // Position of the toast notification
      preventDuplicates: true, // Prevent duplicate messages
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
