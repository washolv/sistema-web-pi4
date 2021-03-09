import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { ModalAdicionarProdutoComponent } from './modals/modal-adicionar-produto/modal-adicionar-produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEditarProdutoComponent } from './modals/modal-editar-produto/modal-editar-produto.component';

const routes: Routes = [
  { path: '', component: ProdutoComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProdutoComponent,
    ModalAdicionarProdutoComponent,
    ModalExcluirProdutoComponent,
    ModalEditarProdutoComponent
  ],
  exports:[
    RouterModule,
  ],
  entryComponents: [
    ModalAdicionarProdutoComponent,
    ModalExcluirProdutoComponent,
]
})
export class ProdutoModule { }
