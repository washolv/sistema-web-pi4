import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DashboardFuncionarioComponent } from './dashboard-funcionario/funcionario/dashboard-funcionario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import localePt from '@angular/common/locales/pt';
import { DashboardAdministradorComponent } from './dashboard-funcionario/dashboard-administrador/dashboard-administrador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoVendasComponent } from './dashboard-funcionario/graficos/GraficoVendas/GraficoVendas.component';
import { GraficoVendasCategoriaComponent } from './dashboard-funcionario/graficos/GraficoVendasCategoria/GraficoVendasCategoria.component';
import { TabelaVendasComponent } from './dashboard-funcionario/dashboard-administrador/tabela-vendas/tabela-vendas.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'vitrine', component: VitrineComponent },
  { path: 'detalhes/:id', component: DetalhesProdutoComponent }
];

registerLocaleData(localePt, 'pt');

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
    ToastrModule.forRoot(),
    NgApexchartsModule
  ],
  providers: [NgbRatingConfig,
    {
      provide: LOCALE_ID,
      useValue: "pt"
    }
  ],
  declarations: [DashboardComponent,
    VitrineComponent,
    DashboardFuncionarioComponent,
    DetalhesProdutoComponent,
    DashboardAdministradorComponent,
    GraficoVendasComponent,
    GraficoVendasCategoriaComponent,
    TabelaVendasComponent
  ],
  exports: [
    DashboardComponent,
    VitrineComponent,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
