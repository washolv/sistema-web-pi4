import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'vitrine', component: VitrineComponent }
];
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatProgressSpinnerModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [NgbRatingConfig],
  declarations: [DashboardComponent, VitrineComponent],
  exports:[
    DashboardComponent,
    VitrineComponent
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
