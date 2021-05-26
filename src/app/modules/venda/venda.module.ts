import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { VendaComponent } from './venda.component';
import { StatusPedidoComponent } from './status-pedido/status-pedido.component';
import { DashboardAdministradorComponent } from './dashboard-administrador/dashboard-administrador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabelaVendasComponent } from './tabela-vendas/tabela-vendas.component';


const routes: Routes = [
  { path: '', component: VendaComponent },
];
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
    NgApexchartsModule
  ],
  declarations: [VendaComponent, StatusPedidoComponent, DashboardAdministradorComponent, TabelaVendasComponent]
})
export class VendaModule { }
