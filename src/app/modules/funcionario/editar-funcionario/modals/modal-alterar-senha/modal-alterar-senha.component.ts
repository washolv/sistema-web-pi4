import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from '../../../models/Funcionario';

@Component({
  selector: 'app-modal-alterar-senha',
  templateUrl: './modal-alterar-senha.component.html',
  styleUrls: ['./modal-alterar-senha.component.css']
})
export class ModalAlterarSenhaComponent implements OnInit {
  funcionario: Funcionario=new Funcionario();
  formSenha: FormGroup;
  formValid=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private funcionarioService: FuncionarioService, public dialogRef: MatDialogRef<ModalAlterarSenhaComponent>){
    if(data.funcionario){
      this.funcionario=this.data.funcionario;
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
    this.dialogRef.close(this.funcionario);
  }
  confirmar(){
    if(this.formSenha.valid){
      this.funcionario.senha=this.formSenha.value.senha;
      this.closeX();
    }else{
      this.formValid=false;
    }
  }


}
