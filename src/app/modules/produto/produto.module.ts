import { AdicionarEstoqueComponent } from './modals/adicionar-estoque/adicionar-estoque.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProdutoComponent } from './produto/produto.component';
import { ModalExcluirProdutoComponent } from './modals/modal-excluir-produto/modal-excluir-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AdicionarImagensProdutoComponent } from './adicionar-produto/adicionar-imagens-produto/adicionar-imagens-produto.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EditarImagensProdutoComponent } from './editar-produto/editar-imagens-produto/editar-imagens-produto.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthGuard } from 'src/app/services/auth.guard';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminGuard } from 'src/app/services/admin.guard';


const routes: Routes = [
  { path: '', component: ProdutoComponent },
  { path: 'editar/:id', component: EditarProdutoComponent,canActivate: [AdminGuard] },
  { path: 'adicionar', component: AdicionarProdutoComponent, canActivate: [AdminGuard],},
  { path: 'visualizar/:id', component: VisualizarProdutoComponent},
  { path: 'adicionar/imagens', component: AdicionarImagensProdutoComponent, canActivate: [AdminGuard]},
  { path: 'editar/imagens/:id', component: EditarImagensProdutoComponent, canActivate: [AdminGuard]}
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
    MDBBootstrapModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgbModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    ProdutoComponent,
    ModalExcluirProdutoComponent,
    EditarProdutoComponent,
    AdicionarProdutoComponent,
    VisualizarProdutoComponent,
    AdicionarImagensProdutoComponent,
    EditarImagensProdutoComponent,
    AdicionarEstoqueComponent
  ],
  exports: [
    RouterModule,
  ],
  providers: [NgbRatingConfig,
    CurrencyPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  entryComponents: [
    ModalExcluirProdutoComponent,
  ],
  bootstrap: [
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProdutoModule { }
