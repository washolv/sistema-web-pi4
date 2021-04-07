import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { Cliente, EnderecoCliente } from '../../cliente/models/Cliente';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {
  formValid: boolean = true;
  formCliente: FormGroup;
  public cepValido = false;
  public cliente: Cliente = new Cliente()
  public endereco: EnderecoCliente = new EnderecoCliente()
  public color: ThemePalette = 'primary';
  public localidade: string = '';
  public uf: string = '';
  public logradouro: string = '';

  constructor(private toastr: ToastrService, private clienteService: ClienteService, private fb: FormBuilder, private buscarCepService: ConsultaCepService, public router: Router, private http: HttpClient) {
    this.formCliente = this.createFormCliente();
  }

  ngOnInit() {
  }

  limparCampos() {
    this.cliente = new Cliente;
    this.endereco = new EnderecoCliente;
    this.formCliente = this.createFormCliente();
    this.formValid = true;
  }

  get f() { return this.formCliente.controls; }


  public createFormCliente(): FormGroup {
    return this.fb.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      cpf: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      telefone: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      dataNascimento: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      email: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])),
      sexo: new FormControl('',
        Validators.compose([
          Validators.required,
        ])),
      senha: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ]))});
  }

  public addCliente() {
    console.log(this.formCliente.value)
    if (this.formCliente.valid) {
      this.clienteService.emailNaoCadastrado(this.formCliente.value.email).subscribe(response => {
        if (!response) {
          this.clienteService.cpfNaoCadastrado(this.formCliente.value.cpf).subscribe(r => {
            if (!r) {
              this.cliente.telefone = this.formCliente.value.telefone;
              this.cliente.cpf = this.formCliente.value.cpf;
              this.cliente.dataNascimento = this.formCliente.value.dataNascimento;
              this.cliente.nome = this.formCliente.value.nome;
              this.cliente.email = this.formCliente.value.email;
              this.cliente.senha = this.formCliente.value.senha;
              this.cliente.sexo = this.formCliente.value.sexo;

              this.clienteService.salvarCliente(this.cliente).subscribe(res => {
                this.toastr.success("Cliente adicionado com sucesso", "OK", {
                  timeOut: 3000, positionClass: 'toast-top-center',
                });
                this.limparCampos();
              }, err => {
                this.toastr.error(err, "Erro", {
                  timeOut: 3000, positionClass: 'toast-top-center',
                });
              })
            }else{
              this.toastr.error("CPF já cadastrado", "Erro", {
                timeOut: 3000, positionClass: 'toast-top-center',
              });
            }
          })
        } else {
          this.toastr.error("e-mail já cadastrado", "Erro", {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      })
    } else {
      this.formValid = false;
    }
  }
  public backPage() {
    this.router.navigate(['/clientes'])
  }


}



