import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoEntregaComponent } from './endereco-entrega/endereco-entrega.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'endereco-entrega', component: EnderecoEntregaComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule
  ],
  declarations: [CheckoutComponent, EnderecoEntregaComponent],
  exports: [
    RouterModule,
  ],
})
export class CheckoutModule {

}
