import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './layout/header/header.module';
import { AuthGuard } from './guards/auth.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteExpenseDialogComponent } from './dialogs/delete-expense-dialog/delete-expense-dialog.component';
import { DeleteCategoryDialogComponent } from './dialogs/delete-category-dialog/delete-category-dialog.component';
import { DeleteAlertDialogComponent } from './dialogs/delete-alert-dialog/delete-alert-dialog.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, DeleteExpenseDialogComponent, DeleteCategoryDialogComponent, DeleteAlertDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    HeaderModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
