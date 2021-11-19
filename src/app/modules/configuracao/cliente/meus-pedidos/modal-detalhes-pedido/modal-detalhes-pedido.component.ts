import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DetalhesVenda, Venda } from 'src/app/modules/checkout/models/Venda';
import { EnderecoCliente } from 'src/app/modules/cliente/models/Cliente';
import { Produto } from 'src/app/modules/produto/models/Produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-modal-detalhes-pedido',
  templateUrl: './modal-detalhes-pedido.component.html',
  styleUrls: ['./modal-detalhes-pedido.component.css']
})
export class ModalDetalhesPedidoComponent implements OnInit {
  venda: Venda = new Venda();
  endereco: EnderecoCliente = new EnderecoCliente();
  detalhes: DetalhesVenda[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalDetalhesPedidoComponent>, private sanitizer: DomSanitizer
    , private produtoService: ProdutoService) {
    if (data) {
      this.venda = data.venda;
      this.endereco = <EnderecoCliente>this.venda.enderecoCliente;
      this.detalhes = <DetalhesVenda[]>this.venda.detalhesVenda;
      this.setProdutos();
    }
  }

  ngOnInit() {

  }
  setProdutos() {
    let p: Produto = new Produto();
    for (let detalhe of this.detalhes) {
      let p = <Produto>detalhe.produto;
      this.produtoService.getImagensProduto(p.id!).subscribe(response => {
        p.imagens = response;
        p.imageToShow=response;
        detalhe.produto=p;
      })
    }
  }
  close() {
    this.dialogRef.close();
  }
  closeX() {
    this.dialogRef.close();
  }
}
