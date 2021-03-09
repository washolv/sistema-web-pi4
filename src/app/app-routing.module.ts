import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteComponent } from './modules/cliente/cliente.component';
import { FuncionarioComponent } from './modules/funcionario/funcionario.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: MainNavComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'produtos', component: MainNavComponent,
    loadChildren: () => import('./../app/modules/produto/produto.module').then(m => m.ProdutoModule),
  },
  {
    path: 'clientes', component: MainNavComponent, children: [
      { path: '', component: ClienteComponent }
    ]
  },
  {
    path: 'funcionarios', component: MainNavComponent, children: [
      { path: '', component: FuncionarioComponent }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
