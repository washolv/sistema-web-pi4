import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import { NavbarComponent } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ModalAlertaComponent,
  ], exports: [
    ModalAlertaComponent
  ], entryComponents: [
    ModalAlertaComponent
  ]
})
export class SharedModule { }
