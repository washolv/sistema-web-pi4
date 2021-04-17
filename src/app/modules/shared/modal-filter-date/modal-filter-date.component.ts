import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-modal-filter-date',
  templateUrl: './modal-filter-date.component.html',
  styleUrls: ['./modal-filter-date.component.css']
})
export class ModalFilterDateComponent implements OnInit {

  public title: string;
  private readonly route: string="";

  selected: { chosenLabel: string, startDate: Moment, endDate: Moment };

  maxDate: moment.Moment;
  minDate: moment.Moment;

  configLocale = {
      format: 'DD/MM/YYYY',
      displayFormat: 'DD/MM/YYYY',
      direction: 'ltr',
      weekLabel: 'W',
      separator: ' até ',
      cancelLabel: 'Cancelar',
      applyLabel: 'Aplicar',
      clearLabel: 'Limpar',
      customRangeLabel: 'Selecionar data',
      daysOfWeek: moment.weekdaysShort(),
      monthNames: moment.months(),
      firstDay: 1 // first day is monday
  };


  invalidDates: moment.Moment[] = [];

  ranges: any = {
      Hoje: [moment(), moment()],
      Ontem: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
      'Últimos 30 dias': [moment().subtract(29, 'days'), moment()],
      'Este mês': [moment().startOf('month'), moment().endOf('month')],
      'Mês passado': [
          moment()
              .subtract(1, 'month')
              .startOf('month'),
          moment()
              .subtract(1, 'month')
              .endOf('month')
      ],
      'Últimos 3 meses': [
          moment()
              .subtract(3, 'month')
              .startOf('month'),
          moment()
              .subtract(1, 'month')
              .endOf('month')
      ]
  };


  public alwaysShowCalendars: boolean;

  constructor(public dialogRef: MatDialogRef<ModalFilterDateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {
      this.title = this.data.title;
      if (this.data.route) {
          this.route = this.data.route;
      }

      this.maxDate = moment().add(2, 'weeks');
      this.minDate = moment().subtract(3, 'days');

      this.selected = {
          chosenLabel: '',
          // startDate: moment().subtract(1, 'days').set({hours: 0, minutes: 0}),
          // endDate: moment().subtract(1, 'days').set({hours: 23, minutes: 59})
          startDate: moment(),
          endDate: moment()
      };
      this.alwaysShowCalendars = true;

  }

  choosedDate(e:any) {
      this.selected = e;
  }

  isInvalidDate = (m: moment.Moment) => {
      return this.invalidDates.some(d => d.isSame(m, 'day'));
  }


  ngOnInit() {
  }


  closeX() {
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close(this.selected);
      if (this.route) {
          this.router.navigate([this.route]);
      }
  }


}
