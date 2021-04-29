import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { ModalAdicionarEnderecoClienteComponent } from '../endereco-cliente/modals/modal-adicionar-endereco-cliente/modal-adicionar-endereco-cliente.component';
import { ModalAdicionarEnderecoCobrancaComponent } from '../endereco-cliente/modals/modal-adicionar-endereco-cobranca/modal-adicionar-endereco-cobranca.component';
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
  public isSmallScreen = false;

  constructor(private toastr: ToastrService,private roleGuardService: RoleGuardService,private dialog: MatDialog,
     private router: Router, private clienteService: ClienteService,private breakpointObserver: BreakpointObserver) {
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
    const dialogRef = this.dialog.open(ModalAdicionarEnderecoCobrancaComponent, {
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
  openModal() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    let dialogRef;
    if (this.isSmallScreen) {
      dialogRef = this.dialog.open(ModalAdicionarEnderecoCobrancaComponent, {
        height: '500px', width: '400px'
      });
    } else {
      dialogRef = this.dialog.open(ModalAdicionarEnderecoCobrancaComponent, {
      });
    }
    return dialogRef;
  }
  adicionarEnderecoCobranca() {
    const dialogRef = this.openModal();
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cliente.enderecoCobranca = response;
        this.clienteService.editarCliente(this.cliente).subscribe(response => {
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
