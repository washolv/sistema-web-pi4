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

const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'editar/:id', component: EditarProdutoComponent},
  { path: 'adicionar', component: AdicionarProdutoComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    ProdutoComponent,
    ModalAdicionarProdutoComponent,
    ModalExcluirProdutoComponent,
    ModalEditarProdutoComponent,
    EditarProdutoComponent,
    AdicionarProdutoComponent,
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
