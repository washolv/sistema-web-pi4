import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProdutoComponent } from '../produto/produto.component';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';

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
