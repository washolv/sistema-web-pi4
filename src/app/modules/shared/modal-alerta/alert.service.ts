import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalAlertaComponent } from './modal-alerta.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef=this.modalService.show(ModalAlertaComponent);
    bsModalRef.content.type=type;
    bsModalRef.content.message=message;
  }
  showAlertSucess(message: string) {
    this.showAlert(message, 'success')
  }
  showAlertDanger(message: string) {
    this.showAlert(message, 'danger')
  }
}
