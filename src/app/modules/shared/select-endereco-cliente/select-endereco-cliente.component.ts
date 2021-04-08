import { Component, OnInit } from '@angular/core';
import { Cliente, EnderecoCliente } from '../../cliente/models/Cliente';

@Component({
  selector: 'app-select-endereco-cliente',
  templateUrl: './select-endereco-cliente.component.html',
  styleUrls: ['./select-endereco-cliente.component.css']
})
export class SelectEnderecoClienteComponent implements OnInit {

  cliente: Cliente=new Cliente();
  endereco = EnderecoCliente;
  constructor() { }

  ngOnInit() {
  }

}
