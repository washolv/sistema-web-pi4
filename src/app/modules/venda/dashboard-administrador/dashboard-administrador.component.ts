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
  public totalProdutosVendidos:number=0;
  public totalVendas:number=0;
  @Output() messageEvent = new EventEmitter<VendidosMes[]>();
  chartOptionsCat: any;
  chartOptionsMonth: any;

  selected?: { chosenLabel: string, startDate: Moment, endDate: Moment };
  orderByConfig = {
    orderKey: 'Sequencia',
    reverse: false,
    isCaseInsensitive: true
  };
  constructor(private dialog: MatDialog, private router: Router, private relatorioVendasService: RelatorioVendasService) {
    this.getInfoCharts(moment().startOf('day'), moment().endOf('day'));
  }
  ngOnInit() {
  }

  getInfoCharts(startDate: Moment, endDate: Moment) {
    const dialogRef = this.dialog.open(LoadingComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur', height: 'auto', width: '180px', disableClose: true
    });
    this.relatorioVendasService.getTotalProdutosVendidos(startDate.toDate(), endDate.toDate()).subscribe(resp=>{
      this.totalProdutosVendidos=resp;
    })
    this.relatorioVendasService.getTotalVendas(startDate.toDate(), endDate.toDate()).subscribe(resp=>{
      this.totalVendas=resp;
    })
    this.relatorioVendasService.getByCategory(startDate.toDate(), endDate.toDate()).subscribe(res => {
      this.vendidosCategoria = res;
      this.criarGraficoCategoria();
    });
    this.relatorioVendasService.getByMonth(startDate.toDate(), endDate.toDate()).subscribe(res => {
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
        this.getInfoCharts(this.selected?.startDate!, this.selected?.endDate!);
      }
    }, err => {
      console.log(err);
      dialogRef.close();
    });
  }
  criarGraficoCategoria() {
    this.chartOptionsCat = {
      series: this.getPorcentagem(),
      chart: {
        type: 'donut',
        width: '66%',
      },
      labels: this.getCategoria(),
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
    };
  }
  criarGraficoMeses() {
    this.chartOptionsMonth = {
      series: [{
        name: "Vendas",
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
    if (this.vendidosPorMes) {
      this.vendidosPorMes.forEach(x => {
        data.push(x.qtdVendida!)
      })
    }
    return data;
  }
  getMonths() {
    let data: string[] = [];
    if (this.vendidosPorMes) {
      this.vendidosPorMes.forEach(y => {
        data.push(y.mes!)
      })
    }
    return data;
  }
  getCategoria() {
    let data: string[] = [];
    if (this.vendidosCategoria) {
      this.vendidosCategoria.forEach(y => {
        data.push(y.categoria!)
      })
    }
    console.log(data)
    return data;
  }
  getPorcentagem() {
    let data: number[] = [];
    if (this.vendidosCategoria) {
      this.vendidosCategoria.forEach(y => {
        data.push(y.porcentagem!)
      })
    }
    return data;
  }

}
