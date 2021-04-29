import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-GraficoVendasCategoria',
  templateUrl: './GraficoVendasCategoria.component.html',
  styleUrls: ['./GraficoVendasCategoria.component.css']
})
export class GraficoVendasCategoriaComponent implements OnInit {
  chartOptions:any;
  @Input() series: []=[];
  @Input() categories: []=[];

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      series: [44, 55, 41, 17, 15],
      chart: {
      type: 'donut',
      width: '66%',
    },
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
    }]
    };
  }

}
