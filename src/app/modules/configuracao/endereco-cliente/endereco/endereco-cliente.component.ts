import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { ModalAdicionarEnderecoClienteComponent } from '../modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import { ModalEditarEnderecoClienteComponent } from '../modals/modal-editar-endereco-cliente/modal-editar-endereco-cliente.component';

@Component({
  selector: 'app-endereco-cliente',
  templateUrl: './endereco-cliente.component.html',
  styleUrls: ['./endereco-cliente.component.css']
})
export class EnderecoClienteComponent implements OnInit {
  public cliente: Cliente=new Cliente();
  totalRegistros: number = 0;
  page: number = 1;
  color: ThemePalette = 'primary';
  public id: number=0;

  constructor(private toastr: ToastrService,private roleGuardService: RoleGuardService,private dialog: MatDialog, private router: Router, private clienteService: ClienteService) {
      const user=this.roleGuardService.decodeJWT();
      this.id=user.id;
      this.clienteService.buscarCliente(this.id).subscribe(resp =>{
        this.cliente=resp;
      })
  }

  ngOnInit() {
  }
  adicionarEndereco(){
    const dialogRef = this.dialog.open(ModalAdicionarEnderecoClienteComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let endereco = response;
        console.log(endereco)
        this.clienteService.adicionarEndereco(this.cliente.id!,endereco).subscribe(response => {
          this.toastr.success("Novo Endereço Cadastrado", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
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
  habilitarEndereco(endereco: any){
      this.clienteService.editarEndereco(endereco).subscribe(resp=>{
        console.log(resp)
      });
  }
  editarEndereco(endereco: EnderecoCliente){
    const dialogRef = this.dialog.open(ModalEditarEnderecoClienteComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
      data: {
        endereco: endereco
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let endereco = response;
        console.log(endereco)
        this.clienteService.editarEndereco(endereco).subscribe(response => {
          this.toastr.success("Endereço alterado com sucesso", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }, err => {
          this.toastr.error("Falha ao alterar endereço", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }
}
