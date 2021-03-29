import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './modules/funcionario/funcionario/funcionario.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { LoginComponent } from './modules/login/login/login.component';
import { CriarContaComponent } from './modules/login/criar-conta/criar-conta.component';
import { AuthenticationComponent } from './modules/login/authentication/authentication.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: AuthenticationComponent,
    children: [
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
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes', component: MainNavComponent,
    loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'funcionarios', component: MainNavComponent,
    loadChildren: () => import('./modules/funcionario/funcionario.module').then(m => m.FuncionarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
