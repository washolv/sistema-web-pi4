import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/modules/cliente/models/Cliente';

@Component({
  selector: 'app-alterar-senha-cliente',
  templateUrl: './alterar-senha-cliente.component.html',
  styleUrls: ['./alterar-senha-cliente.component.css']
})
export class AlterarSenhaClienteComponent implements OnInit {
  cliente: Cliente=new Cliente();
  formSenha: FormGroup;
  formValid=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AlterarSenhaClienteComponent>){
    if(data.cliente){
      this.cliente=this.data.cliente;
    }
    this.formSenha=new FormGroup({
      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ]))
    })
  }
  get f() { return this.formSenha.controls; }

  ngOnInit() {

  }
  close(){
    this.dialogRef.close();
  }
  closeX(){
    this.dialogRef.close(this.cliente);
  }
  confirmar(){
    if(this.formSenha.valid){
      this.cliente.usuario!.password=this.formSenha.value.senha;
      this.closeX();
    }else{
      this.formValid=false;
    }
  }


}
