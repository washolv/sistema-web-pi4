import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { ModalAdicionarEnderecoClienteComponent } from '../endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import { ModalEditarEnderecoClienteComponent } from '../endereco-cliente/modals/modal-editar-endereco-cliente/modal-editar-endereco-cliente.component';

@Component({
  selector: 'app-endereco-cobranca',
  templateUrl: './endereco-cobranca.component.html',
  styleUrls: ['./endereco-cobranca.component.css']
})
export class EnderecoCobrancaComponent implements OnInit {
  public cliente: Cliente=new Cliente();
  public enderecos: EnderecoCliente[]=[];
  public endereco: EnderecoCliente=new EnderecoCliente();
  totalRegistros: number = 0;
  page: number = 1;
  color: ThemePalette = 'primary';
  public id: number=0;
  public statusAddress=false;
  constructor(private toastr: ToastrService,private roleGuardService: RoleGuardService,private dialog: MatDialog,
     private router: Router, private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.id=<number> this.roleGuardService.getUser().Id;
      this.clienteService.buscarCliente(this.id).subscribe(response =>{
        this.cliente=response;
        this.endereco=<EnderecoCliente>response.enderecoCobranca;
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
        response.id=endereco.id;

        this.clienteService.editarEndereco(this.id,response).subscribe(response => {
          this.toastr.success("Endereço alterado com sucesso", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.ngOnInit();
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
  backPage(){
    this.router.navigate(['/configuracoes'])
  }
}
