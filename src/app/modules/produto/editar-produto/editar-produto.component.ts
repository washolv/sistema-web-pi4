import { PathLocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { ModalEditarProdutoComponent } from '../modals/modal-editar-produto/modal-editar-produto.component';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  public produto: Produto=new Produto();
  public formProduto: FormGroup;
  public id: number=0;
  constructor(private router: Router,private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService) {
      this.formProduto=this.createForm(this.produto);
      this.route.params.subscribe( parametros => {
          this.id=parametros['id'];
      });
      this.produtoService.getProdutoById(this.id).subscribe(response => {
        this.produto=response
        this.formProduto=this.createForm(this.produto);
      })
    }

  ngOnInit() {

  }
  public createForm(produto: Produto): FormGroup {
    return this.fb.group({
      id: new FormControl(produto.id),
      nome: new FormControl(produto.nome),
      descricao: new FormControl(produto.descricao),
      quantidadeEstoque: new FormControl(produto.quantidadeEstoque),
      preco: new FormControl(produto.preco),
      categoria: new FormControl(produto.categoria),
      status: new FormControl(produto.status)
    });
  }

  public editarProduto(p: Produto) {
    console.log(p);
    this.produtoService.editarProduto(p).subscribe((response: any) => {
      if (response) {
        window.location.reload()
      }
    });
  }

  habilitaProduto(btn: any){
    if(btn.target.id=="ativo"){
      this.produto.status=1;
    }else{
      this.produto.status=0;
    }
  }
  backProdutos(){
    this.router.navigate(['produtos']);
  }
}
