import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertaComponent } from './modal-alerta/modal-alerta.component';
import { CardsModule } from 'angular-bootstrap-md'
import { AccordionModule, AnimatedCardsModule, AutoCompleterModule, AutoFormatModule, CharCounterModule, ChartSimpleModule, ChipsModule, DatepickerModule, FileInputModule, IconsModule, LightBoxModule, MDBBootstrapModulePro, MDBBootstrapModulesPro, PreloadersModule, RangeModule, ScrollSpyModule, SelectModule, SidenavModule, SmoothscrollModule, StepperModule, StickyContentModule, TabsModule, TimePickerModule, ToastModule } from 'ng-uikit-pro-standard'

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
    ChipsModule,
    TimePickerModule,
  ],
  declarations: [
    ModalAlertaComponent,
  ], exports: [
    ModalAlertaComponent
  ], entryComponents: [
    ModalAlertaComponent
  ]
})
export class SharedModule { }
