import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DetalhesVenda, Venda } from 'src/app/modules/checkout/models/Venda';
import { EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { Produto } from 'src/app/modules/produto/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { VendaService } from 'src/app/services/venda.service';
import { Status } from '../models/Status';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css']
})
export class StatusPedidoComponent implements OnInit {
  venda: Venda = new Venda();
  endereco: EnderecoCliente = new EnderecoCliente();
  detalhes: DetalhesVenda[] = [];
  public listaStatus: Status[]=[];
  status: Status=new Status(0,"");
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<StatusPedidoComponent>,
   private sanitizer: DomSanitizer, private produtoService: ProdutoService, private vendaService: VendaService) {
    if (data) {
      this.venda = data.venda;
      this.endereco = <EnderecoCliente>this.venda.enderecoCliente;
      this.detalhes = <DetalhesVenda[]>this.venda.detalhesVenda;
      this.setProdutos();
    }
  }

  ngOnInit() {
    this.listaStatus=this.vendaService.getStatusVenda();
  }
  setProdutos() {
    let p: Produto = new Produto();
    for (let detalhe of this.detalhes) {
      let p = <Produto>detalhe.produto;
      this.produtoService.getImagensProduto(p.id!).subscribe(response => {
        p.imagens = response;
        response.forEach(element => {
          p.imageToShow = [];
          p.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)));
        })
        detalhe.produto=p;
      })
    }
  }
  close() {
    this.dialogRef.close();
  }
  closeX() {
    if(this.status.descricao){
      this.venda.status=this.status.descricao;
      this.dialogRef.close(this.venda);
      return;
    }
    this.close();
  }
  selectStatus(status : Status){
    this.status=status;
  }

}
