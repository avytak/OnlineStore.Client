import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { AccordionModule } from 'primeng/accordion';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    InputGroupAddonModule,
    InputGroupModule,
    AccordionModule,
    RippleModule,
    StyleClassModule,
    DialogModule
  ],
  exports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    InputGroupAddonModule,
    InputGroupModule,
    AccordionModule,
    DialogModule
  ]
})
export class UiKitModule { }