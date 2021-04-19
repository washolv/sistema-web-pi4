import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { RoleGuardService } from 'src/app/services/RoleGuard.service';
import { EnderecoCliente } from '../../cliente/models/Cliente';

@Component({
  selector: 'app-endereco-entrega',
  templateUrl: './endereco-entrega.component.html',
  styleUrls: ['./endereco-entrega.component.css']
})
export class EnderecoEntregaComponent implements OnInit {
  public id: number=0;
  public enderecos: EnderecoCliente[]=[];
  public endereco: EnderecoCliente=new EnderecoCliente;
  constructor(private roleGuardService: RoleGuardService, private clienteService: ClienteService) { }

  ngOnInit() {
    const user=this.roleGuardService.decodeJWT();
    this.id=user.Id;
    this.clienteService.buscarEnderecos(this.id).subscribe(resp =>{
      this.enderecos=resp;
      this.endereco=resp[0];
    })
  }
  enderecoEntrega(index: number){
    this.endereco=this.enderecos[index];
  }

}
