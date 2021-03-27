import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FuncionarioService } from 'src/app/services/funcionario.service';
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
  constructor(private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit() {
  }
  public habilitarFuncionario(f: Funcionario,) {
    if (f.status) {
      f.status = 1;
    } else {
      f.status = 0;
    }
    this.funcionarioService.editarFuncionario(f).subscribe((response: any) => {
    });
  }
  public editarFuncionario(f: Funcionario){
    this.router.navigate(['/funcionarios/editar', f.id]);
  }
  public adicionarFuncionario(){
    this.router.navigate(['/clientes/adicionar']);
  }

}
