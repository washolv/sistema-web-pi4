import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../models/Cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public clientes: Cliente[] = [];
  public filtroPesquisa: string = "";
  searchFilter = new Subject<string>();
  color: ThemePalette = 'primary';

  totalRegistros: number = 0;
  page: number = 1
  teste: boolean = false;

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.buscarClientes()
      .subscribe((response: Cliente[]) => {
        this.clientes = <Cliente[]> response;
        this.totalRegistros=this.clientes.length;
      }, (err: any) => {
        console.log(err);
      });
  }

  public habilitarCliente(c: Cliente) {
    this.clienteService.editarCliente(c).subscribe((response: any) => {
    });
  }
  public editarCliente(c: Cliente){
    this.router.navigate(['/clientes/editar', c.id]);
  }
  public adicionarcliente(){
    this.router.navigate(['/clientes/adicionar']);
  }
}
