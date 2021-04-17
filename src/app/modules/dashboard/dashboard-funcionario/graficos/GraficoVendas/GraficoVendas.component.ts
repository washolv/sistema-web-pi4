import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-GraficoVendas',
  templateUrl: './GraficoVendas.component.html',
  styleUrls: ['./GraficoVendas.component.css']
})
export class GraficoVendasComponent implements OnInit {
  chartOptions: any;
  constructor() {

  }

  ngOnInit() {
    this.chartOptions = {
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
        categories: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
      }
    };

  }


}
