import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MatDividerModule, FlexLayoutModule],
  exports: [FooterComponent],
})
export class FooterModule {}
