import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto/produto.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: ProdutoComponent},
  {path: 'produtos', component: ProdutoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),MatDialogModule,RouterModule,FormsModule,

],
  exports: [RouterModule]
})
export class AppRoutingModule { }
