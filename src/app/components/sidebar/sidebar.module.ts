import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AccordionModule } from '../accordion/accordion.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
