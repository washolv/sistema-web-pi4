import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatepickerModule } from 'ng-uikit-pro-standard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

const routes = [
  { path: 'autenticacao', component: AuthenticationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent }
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
    MDBBootstrapModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgbModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    DatepickerModule,
    MatNativeDateModule,
    WavesModule,
    MatFormFieldModule,
    CurrencyMaskModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    LoginComponent,
    CriarContaComponent
  ],
})
export class LoginModule { }
