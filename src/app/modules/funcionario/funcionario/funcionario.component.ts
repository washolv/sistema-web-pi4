import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { Funcionario } from '../models/Funcionario';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  public funcionarios: Funcionario[] = [];
  public filtroPesquisa: string = "";
  searchFilter = new Subject<string>();
  color: ThemePalette = 'primary';
  totalRegistros: number = 0;
  page: number = 1
  teste: boolean = false;
  userRole?:string;
  isAdmin: boolean;
  constructor(private roleGuardService: RoleGuardService, private spinner: NgxSpinnerService,private funcionarioService: FuncionarioService, private router: Router) {
    this.userRole=this.roleGuardService.getUserRole();
    this.isAdmin=this.userRole=='ROLE_ADMIN'
    this.searchFilter.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(search => {
        this.funcionarioService.buscarFuncionarioPorNome(search)
          .subscribe((response: Funcionario[]) => {
            if (response) {
              this.funcionarios = response;
            }
          });
      });
   }

  ngOnInit() {
     /** spinner starts on init */
     this.spinner.show();

    this.funcionarioService.buscarFuncionarios().subscribe(response=>{
      this.funcionarios=response;
    })
  }
  public habilitarFuncionario(f: Funcionario,) {
    this.funcionarioService.editarFuncionario(f).subscribe((response: any) => {
    });
  }
  public editarFuncionario(f: Funcionario){
    this.router.navigate(['/funcionarios/editar', f.id]);
  }
  public adicionarFuncionario(){
    this.router.navigate(['/funcionarios/adicionar']);
  }

}
