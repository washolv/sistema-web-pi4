import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoEntregaComponent } from './endereco-entrega/endereco-entrega.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'endereco-entrega', component: EnderecoEntregaComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CheckoutComponent, EnderecoEntregaComponent],
  exports: [
    RouterModule,
  ],
})
export class CheckoutModule {

}
