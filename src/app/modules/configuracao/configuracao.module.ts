import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonsModule, MDBBootstrapModule, ModalModule, TooltipModule, WavesModule } from 'angular-bootstrap-md';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { DatepickerModule, PopoverModule } from 'ng-uikit-pro-standard';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalEditarEnderecoClienteComponent } from './cliente/endereco-cliente/modals/modal-editar-endereco-cliente/modal-editar-endereco-cliente.component';
import { ModalAdicionarEnderecoClienteComponent } from './cliente/endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import { EnderecoClienteComponent } from './cliente/endereco-cliente/endereco/endereco-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { AlterarSenhaClienteComponent } from './cliente/editar-cliente/alterar-senha-cliente/alterar-senha-cliente.component';
import { EnderecoCobrancaComponent } from './cliente/endereco-cobranca/endereco-cobranca.component';
import { MeusPedidosComponent } from './cliente/meus-pedidos/meus-pedidos.component';
import { ModalAdicionarEnderecoCobrancaComponent } from './cliente/endereco-cliente/modals/modal-adicionar-endereco-cobranca/modal-adicionar-endereco-cobranca.component';
import { ModalDetalhesPedidoComponent } from './cliente/meus-pedidos/modal-detalhes-pedido/modal-detalhes-pedido.component';
import {MatStepperModule} from '@angular/material/stepper';

const routes = [
  { path: '', component: ConfiguracaoComponent },
  { path: 'enderecos', component: EnderecoClienteComponent },
  { path: 'meus-dados', component: EditarClienteComponent },
  { path: 'endereco-cobranca', component: EnderecoCobrancaComponent },
  { path: 'meus-pedidos', component: MeusPedidosComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgbModule,
    MatTabsModule,
    MatButtonModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,
    MatButtonModule,
    MatIconModule,
    DatepickerModule,
    MatNativeDateModule,
    WavesModule,
    MatFormFieldModule,
    CurrencyMaskModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forChild(),
    NgxPaginationModule,
    MatStepperModule
  ],
  declarations: [
    ConfiguracaoComponent,
    EnderecoClienteComponent,
    EditarClienteComponent,
    AlterarSenhaClienteComponent,
    ModalEditarEnderecoClienteComponent,
    EnderecoCobrancaComponent,
    MeusPedidosComponent,
    ModalDetalhesPedidoComponent,
    ModalAdicionarEnderecoCobrancaComponent,
    ModalAdicionarEnderecoClienteComponent,
    ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguracaoModule { }
