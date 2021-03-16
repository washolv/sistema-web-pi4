import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { VitrineComponent } from './vitrine/vitrine.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'vitrine', component: VitrineComponent }
];
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [DashboardComponent, VitrineComponent],
  exports:[
    DashboardComponent,
    VitrineComponent
  ]
})
export class DashboardModule { }
