import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoEntregaComponent } from './components/endereco-entrega/endereco-entrega.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { MatSelectModule } from '@angular/material/select';
import { ClienteGuard } from 'src/app/services/cliente.guard';
import { MatButtonModule } from '@angular/material/button';
import { PagamentoComponent } from './components/pagamento/pagamento.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxMaskModule } from 'ngx-mask';
import { ResumoPedidoComponent } from './components/resumo-pedido/resumo-pedido.component';
import { ModalVendaCadastradaComponent } from './modals/ModalVendaCadastrada/ModalVendaCadastrada.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'carrinho', component: CheckoutComponent },
  { path: 'endereco-entrega', component: EnderecoEntregaComponent, canActivate: [ClienteGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [ClienteGuard] },
  { path: 'resumo-do-pedido', component: ResumoPedidoComponent, canActivate: [ClienteGuard] },
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
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    NgxMaskModule
  ],
  declarations: [CheckoutComponent, PagamentoComponent,EnderecoEntregaComponent, ModalVendaCadastradaComponent, ResumoPedidoComponent],
  exports: [
    RouterModule,
  ],
})
export class CheckoutModule {

}
