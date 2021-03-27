import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { AdicionarFuncionarioComponent } from './adicionar-funcionario/adicionar-funcionario.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';


const routes: Routes = [
  { path: '', component: FuncionarioComponent },
  { path: 'editar/:id', component: EditarFuncionarioComponent },
  { path: 'adicionar', component: AdicionarFuncionarioComponent },
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
  declarations: [FuncionarioComponent, EditarFuncionarioComponent, AdicionarFuncionarioComponent]
})
export class FuncionarioModule { }
