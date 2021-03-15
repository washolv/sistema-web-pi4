import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.css']
})
export class ModalAlertaComponent implements OnInit {
  @Input() public message: String='';
  @Input() public tipo: String='success';
  constructor() { }

  ngOnInit() {
  }

}
