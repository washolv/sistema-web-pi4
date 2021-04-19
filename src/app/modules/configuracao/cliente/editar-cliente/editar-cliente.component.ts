import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalAlterarSenhaComponent } from '../../../funcionario/editar-funcionario/modals/modal-alterar-senha/modal-alterar-senha.component';
import { Usuario } from '../../../funcionario/models/Funcionario';
import { Cliente } from '../../../cliente/models/Cliente';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { TokenDecoded } from 'src/app/modules/login/login/models/TokenDecoded';
import { AlterarSenhaClienteComponent } from './alterar-senha-cliente/alterar-senha-cliente.component';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  formValid: boolean = true;
  public formCliente!: FormGroup;
  public cepValido = false;
  public cliente: Cliente = new Cliente()
  private usuario: Usuario = new Usuario;
  public color: ThemePalette = 'primary';
  public id? : number;
  constructor(private dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute, private clienteService: ClienteService, private fb: FormBuilder,
   public router: Router, private http: HttpClient, private roleGuardService: RoleGuardService) {
    let user = this.roleGuardService.getUser();
    this.id = user.Id;

    this.formCliente = this.createFormCliente(this.cliente);
    clienteService.buscarCliente(this.id!).subscribe(res => {
      this.cliente = res;
      console.log(res)
      this.formCliente = this.createFormCliente(this.cliente);
    })
  }

  ngOnInit() {
  }

  get f() { return this.formCliente.controls; }

  public createFormCliente(cliente: Cliente): FormGroup {
    return this.fb.group({
      nome: new FormControl(this.cliente.nome, Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      sobrenome: new FormControl(this.cliente.sobrenome, Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      cpf: new FormControl({ value: this.cliente.cpf, disabled: true },
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
        ])),
        sexo: new FormControl({ value: this.cliente.sexo, disabled: true },
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
          ])),
          email: new FormControl( { value: this.cliente.usuario?.username, disabled: true },
            Validators.compose([
              Validators.required,
              Validators.email,
            ])),
      dataNascimento: new FormControl({ value: this.cliente.dataNascimento, disabled: true },
        Validators.compose([
          Validators.required,
        ])),
      senha: new FormControl(this.cliente.usuario?.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])),
      telefone: new FormControl({ value: this.cliente.telefone, disabled: true }, Validators.required),
    });
  }
  public salvarCliente() {
    if (this.formCliente.valid) {
      this.cliente.nome = this.formCliente.value.nome;
      this.cliente.sobrenome = this.formCliente.value.sobrenome;

      this.clienteService.editarCliente(this.cliente).subscribe(res => {
        this.toastr.success("Cliente editado com sucesso", "OK", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, err => {
        this.toastr.error(err, "Erro", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      })
    } else {
      this.formValid = false;
    }
  }
  public backPage() {
    this.router.navigate(['/clientes'])
  }

  alterarSenha() {
    const dialogRef = this.dialog.open(AlterarSenhaClienteComponent, {
      panelClass: 'custom-modais', backdropClass: 'blur',
      data: {
        cliente: this.cliente
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.cliente = response;
        console.log(this.cliente)
        this.clienteService.editarCliente(this.cliente).subscribe(response => {
          this.toastr.success("Senha alterada com sucesso", "OK", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }, err => {
          this.toastr.error("Falha ao alterar senha", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        })
      }
    }, err => {
      console.log(err);
    });
  }
}


