import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccordionModule } from './accordion/accordion.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [
    SidebarComponent,
    AccordionModule
  ]
})
export class ComponentsModule { }
