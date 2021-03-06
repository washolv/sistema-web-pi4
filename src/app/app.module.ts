import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoModule } from './modules/produto/produto.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { LoginModule } from './modules/login/login.module';
import { AuthenticationComponent } from './modules/login/authentication/authentication.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtInterceptor } from './modules/shared/helpers/JwtInterceptor';
import { ErrorInterceptor } from './modules/shared/helpers/error.interceptor';
import { NgxMaskModule } from 'ngx-mask';
import { MainNavLoginComponent } from './modules/shared/main-nav-login/main-nav-login.component';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { MainNavFuncionarioComponent } from './modules/shared/main-nav/main-nav-funcionario/main-nav-funcionario.component';
import { MainNavClienteComponent } from './modules/shared/main-nav/main-nav-cliente/main-nav-cliente.component';
import { MainNavComponent } from './modules/shared/main-nav/main-nav/main-nav.component';
import { ConfiguracaoModule } from './modules/configuracao/configuracao.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { VendaModule } from './modules/venda/venda.module';



const routes: Routes = [
  { path: '', component: AppComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AuthenticationComponent,
    MainNavLoginComponent,
    MainNavFuncionarioComponent,
    MainNavClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    ProdutoModule,
    LoginModule,
    CheckoutModule,
    SharedModule,
    VendaModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ConfiguracaoModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
