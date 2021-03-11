import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { ModalAdicionarProdutoComponent } from './modals/modal-adicionar-produto/modal-adicionar-produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEditarProdutoComponent } from './modals/modal-editar-produto/modal-editar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdicionarImagensProdutoComponent } from './adicionar-produto/adicionar-imagens-produto/adicionar-imagens-produto.component';

const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'editar/:id', component: EditarProdutoComponent },
  { path: 'adicionar', component: AdicionarProdutoComponent },
  { path: 'visualizar/:id', component: VisualizarProdutoComponent },
  { path: 'adicionar/imagens', component: AdicionarImagensProdutoComponent }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot()

  ],
  declarations: [
    ProdutoComponent,
    ModalAdicionarProdutoComponent,
    ModalExcluirProdutoComponent,
    ModalEditarProdutoComponent,
    EditarProdutoComponent,
    AdicionarProdutoComponent,
    VisualizarProdutoComponent,
    AdicionarImagensProdutoComponent
  ],
  exports: [
    RouterModule,
  ],
  entryComponents: [
    ModalAdicionarProdutoComponent,
    ModalExcluirProdutoComponent,
  ]
})
export class ProdutoModule { }
