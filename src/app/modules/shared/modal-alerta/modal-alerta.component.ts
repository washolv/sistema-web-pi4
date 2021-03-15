import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.css']
})
export class ModalAlertaComponent implements OnInit {
  public message: String="";
  constructor() { }

  ngOnInit() {
  }

}
