import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoModule } from './modules/produto/produto.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { SharedModule } from './modules/shared/shared.module';
import { LoginModule } from './modules/login/login.module';
import { AuthenticationComponent } from './modules/login/authentication/authentication.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtInterceptor } from './modules/shared/helpers/JwtInterceptor';
import { ErrorInterceptor } from './modules/shared/helpers/error.interceptor';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';


const routes: Routes = [
  { path: '', component: AppComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    ProdutoModule,
    LoginModule,
    SharedModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
