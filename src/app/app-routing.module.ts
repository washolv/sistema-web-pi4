import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './modules/shared/main-nav/main-nav.component';
import { AuthenticationComponent } from './modules/login/authentication/authentication.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { ClienteGuard } from './services/cliente.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: AuthenticationComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'dashboard', component: MainNavComponent,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'produtos', component: MainNavComponent,
    loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_ESTOQUISTA']
    }
  },
  {
    path: 'clientes', component: MainNavComponent,
    loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'funcionarios', component: MainNavComponent,
    loadChildren: () => import('./modules/funcionario/funcionario.module').then(m => m.FuncionarioModule),
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['ROLE_ADMIN', 'ROLE_ESTOQUISTA']
    }
  },
  {
    path: 'compras', component: MainNavComponent,
    loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule),
    //canActivate: [ClienteGuard],
   /* data: {
      expectedRole: ['ROLE_CLIENTE']
    }*/
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
