import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente/cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';


const routes: Routes = [
  { path: '', component: ClienteComponent },

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
    NgxMaskModule.forChild(),

  ],
  declarations: [
    ClienteComponent,


  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClienteModule { }
