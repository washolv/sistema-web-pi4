import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes = [
  { path: 'autenticacao', component: AuthenticationComponent },
  { path: 'login', component: LoginComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
   MDBBootstrapModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    CriarContaComponent
  ],
})
export class LoginModule { }
