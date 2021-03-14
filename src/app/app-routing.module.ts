import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteComponent } from './modules/cliente/cliente.component';
import { FuncionarioComponent } from './modules/funcionario/funcionario.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { ProdutoComponent } from './modules/produto/produto.component';
import { AdicionarProdutoComponent } from './modules/produto/adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './modules/produto/editar-produto/editar-produto.component';
import { LoginComponent } from './modules/login/login/login.component';
import { CriarContaComponent } from './modules/login/criar-conta/criar-conta.component';
import { AuthGuard } from './services/auth.guard';
import { AuthenticationComponent } from './modules/login/authentication/authentication.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', component: LoginComponent },
      { path: 'cadastro', component: CriarContaComponent },
    ]
  },
  {
    path: 'dashboard', component: MainNavComponent, children: [
      { path: '', component: DashboardComponent },
    ]
  },
  {
    path: 'produtos', component: MainNavComponent,
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: 'clientes', component: MainNavComponent, children: [
      { path: '', component: ClienteComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'funcionarios', component: MainNavComponent, children: [
      { path: '', component: FuncionarioComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'produtos', component: MainNavComponent,
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
