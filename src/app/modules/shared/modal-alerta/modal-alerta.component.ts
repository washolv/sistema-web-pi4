import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.css']
})
export class ModalAlertaComponent implements OnInit {
  @Input() public message: String='';
  @Input() public type: String='success';
  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
  onClose(){
    this.bsModalRef.hide();
  }
}
