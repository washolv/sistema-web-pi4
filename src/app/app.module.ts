import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoModule } from './modules/produto/produto.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { SharedModule } from './modules/shared/shared.module';


const routes: Routes = [
  { path: '', component: AppComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProdutoModule,
    SharedModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
