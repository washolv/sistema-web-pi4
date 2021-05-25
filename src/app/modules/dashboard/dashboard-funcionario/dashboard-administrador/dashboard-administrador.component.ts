import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LoadingComponent } from 'src/app/modules/shared/loading/loading.component';
import { ModalFilterDateComponent } from 'src/app/modules/shared/modal-filter-date/modal-filter-date.component';
import { RelatorioVendasService } from 'src/app/services/relatorio-vendas.service';
import { VendidosCategoria, VendidosMes } from './models/VendidosCategoria';

@Component({
  selector: 'app-dashboard-administrador',
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css']
})
export class DashboardAdministradorComponent implements OnInit {
  public vendidosPorMes: VendidosMes[] = [];
  public vendidosCategoria: VendidosCategoria[] = [];
  @Output() messageEvent = new EventEmitter<VendidosMes[]>();
  chartOptions: any;

  selected?: { chosenLabel: string, startDate: Moment, endDate: Moment };
  orderByConfig = {
    orderKey: 'Sequencia',
    reverse: false,
    isCaseInsensitive: true
  };
  constructor(private dialog: MatDialog, private router: Router, private relatorioVendasService: RelatorioVendasService) {
    this.getInfoCharts();
  }
  ngOnInit() {
  }

  getInfoCharts() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    /* this.relatorioVendasService.getByCategory(moment().startOf('day').toDate(), moment().endOf('day').toDate()).subscribe(res =>{
       console.log(res);
     });*/
    this.relatorioVendasService.getByMonth(moment().startOf('day').toDate(), moment().endOf('day').toDate()).subscribe(res => {
      this.vendidosPorMes = res;
      this.criarGraficoMeses();
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
        console.log(response)
        this.relatorioVendasService.getByMonth(this.selected?.startDate.toDate()!, this.selected?.endDate.toDate()!).subscribe((res: VendidosMes[]) => {
          this.vendidosPorMes = res;
          console.log(this.vendidosPorMes)
          this.criarGraficoMeses();
          dialogRef.close();
        });
      }
    }, err => {
      console.log(err);
      dialogRef.close();
    });
  }

  criarGraficoMeses() {
    this.chartOptions = {
      series: [{
        name: "Desktops",
        data: this.getDataMonth()
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Produtos vendidos por Mês',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: this.getMonths(),
      }
    };

  }
  getDataMonth() {
    let data: number[] = [];
    if (this.vendidosCategoria) {
      this.vendidosPorMes.forEach(x => {
        data.push(x.qtdVendida!)
      })
    }
    return data;
  }
  getMonths() {
    let data: string[] = [];
    if (this.vendidosCategoria) {
      this.vendidosPorMes.forEach(y => {
        data.push(y.mes!)
      })
    }
    console.log(data)
    return data;
  }
}
