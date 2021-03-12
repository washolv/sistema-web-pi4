import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdicionarImagensProdutoComponent } from './adicionar-produto/adicionar-imagens-produto/adicionar-imagens-produto.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EditarImagensProdutoComponent } from './editar-produto/editar-imagens-produto/editar-imagens-produto.component';

const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'editar/:id', component: EditarProdutoComponent },
  { path: 'adicionar', component: AdicionarProdutoComponent },
  { path: 'visualizar/:id', component: VisualizarProdutoComponent },
  { path: 'adicionar/imagens', component: AdicionarImagensProdutoComponent },
  { path: 'editar/imagens/:id', component: EditarImagensProdutoComponent }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    CurrencyMaskModule,
  ],
  declarations: [
    ProdutoComponent,
    ModalExcluirProdutoComponent,
    EditarProdutoComponent,
    AdicionarProdutoComponent,
    VisualizarProdutoComponent,
    AdicionarImagensProdutoComponent,
    EditarImagensProdutoComponent
  ],
  exports: [
    RouterModule,
  ],
  entryComponents: [
    ModalExcluirProdutoComponent,
  ],
  providers:[
  ]
})
export class ProdutoModule { }
