import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import { CardsModule, MDBBootstrapModule } from 'angular-bootstrap-md'
import { AccordionModule, AnimatedCardsModule, AutoCompleterModule, AutoFormatModule, CharCounterModule, ChartSimpleModule, ChipsModule, DatepickerModule, FileInputModule, IconsModule, LightBoxModule, MDBBootstrapModulePro, MDBBootstrapModulesPro, PreloadersModule, RangeModule, ScrollSpyModule, SelectModule, SidenavModule, SmoothscrollModule, StepperModule, StickyContentModule, TabsModule, TimePickerModule, ToastModule } from 'ng-uikit-pro-standard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalFilterDateComponent } from './modal-filter-date/modal-filter-date.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    ToastModule.forRoot(),
    AutoCompleterModule,
    AutoFormatModule,
    AnimatedCardsModule.forRoot(),
    CardsModule.forRoot(),
    DatepickerModule,
    ChartSimpleModule,
    FileInputModule,
    CharCounterModule.forRoot(),
    LightBoxModule,
    SelectModule,
    PreloadersModule,
    RangeModule,
    ScrollSpyModule,
    SidenavModule,
    SmoothscrollModule.forRoot(),
    StepperModule,
    StickyContentModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    ChipsModule,
    TimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModule,
    CurrencyMaskModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgbModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxDaterangepickerMd.forRoot(),

  ],
  declarations: [
    ModalAlertaComponent,ModalFilterDateComponent,
    LoadingComponent,
  ], exports: [
    ModalAlertaComponent,
  ], entryComponents: [
    ModalAlertaComponent
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
