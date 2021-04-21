import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { EnderecoCliente } from '../../cliente/models/Cliente';
import { ModalAdicionarEnderecoClienteComponent } from '../../configuracao/cliente/endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';

@Component({
  selector: 'app-endereco-entrega',
  templateUrl: './endereco-entrega.component.html',
  styleUrls: ['./endereco-entrega.component.css']
})
export class EnderecoEntregaComponent implements OnInit {
  public id: number=0;
  public enderecos: EnderecoCliente[]=[];
  public endereco: EnderecoCliente=new EnderecoCliente;
  constructor(private toastr: ToastrService, private roleGuardService: RoleGuardService, private clienteService: ClienteService,private dialog: MatDialog) { }

  ngOnInit() {
    const user=this.roleGuardService.decodeJWT();
    this.id=user.Id;
    this.clienteService.buscarEnderecos(this.id).subscribe(resp =>{
      this.enderecos=resp;
      this.endereco=resp[0];
    })
  }
  enderecoEntrega(index: number){
    this.endereco=this.enderecos[index];
  }
  adicionarEndereco(){
    const dialogRef = this.dialog.open(ModalAdicionarEnderecoClienteComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let endereco = response;
        this.clienteService.adicionarEndereco(this.id,endereco).subscribe(response => {
          this.toastr.success("Novo Endereço Cadastrado", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.ngOnInit();
        }, err => {
          this.toastr.error("Falha cadastrar endereço", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }
}
