import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Produto } from '../produto/models/Produto';

const routes=[
  {path: '', component: CheckoutComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutModule{

}
