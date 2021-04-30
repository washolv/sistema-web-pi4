import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LoadingComponent } from 'src/app/modules/shared/loading/loading.component';
import { ModalFilterDateComponent } from 'src/app/modules/shared/modal-filter-date/modal-filter-date.component';
import { RelatorioVendasService } from 'src/app/services/relatorio-vendas.service';

@Component({
  selector: 'app-dashboard-administrador',
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css']
})
export class DashboardAdministradorComponent implements OnInit {
  selected?: { chosenLabel: string, startDate: Moment, endDate: Moment };
  orderByConfig = {
    orderKey: 'Sequencia',
    reverse: false,
    isCaseInsensitive: true
  };
  constructor(private dialog: MatDialog, private router: Router, private relatorioVendasService: RelatorioVendasService) {
    this.getInfoCharts();
  }

  getInfoCharts(){
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.relatorioVendasService.getByCategory(moment().startOf('day').toDate(), moment().endOf('day').toDate()).subscribe(res =>{
      console.log(res);
    });
    this.relatorioVendasService.getByMonth(moment().startOf('day').toDate(), moment().endOf('day').toDate()).subscribe(res =>{
      console.log(res);
      dialogRef.close();
    });
  }

  modalFilterDate() {
    const dialogRef = this.dialog.open(ModalFilterDateComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '800px',
      data: {
        title: '',
        route: '',
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.selected = response;
      }
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
  }

}
