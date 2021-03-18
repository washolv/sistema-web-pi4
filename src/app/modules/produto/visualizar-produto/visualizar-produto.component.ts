import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../models/Produto';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.css'],
})
export class VisualizarProdutoComponent implements OnInit {
  produto: Produto = new Produto();
  id: number = 0;
  formProduto: FormGroup;
  imageProduto: any;
  imageToShow: SafeResourceUrl[] = [];
  public currentRate: number=0;
  imagens: any;
  cont: number = 0;
  constructor(private config: NgbRatingConfig, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private produtoService: ProdutoService) {
    this.config.max = 5;
    this.formProduto = this.createForm(this.produto);
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];
    });
    this.produtoService.getProdutoById(this.id).subscribe(response => {
      this.produto = response
      this.formProduto = this.createForm(this.produto);
      this.currentRate=<number> this.produto.qtdEstrelas;
    })

    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      console.log(response);
      response.forEach(element =>
        this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
      )
    })

  }

  ngOnInit() {
    this.formProduto.disable();
  }

  public createForm(produto: Produto): FormGroup {
    const status = produto.status == 1;
    console.log(status);
    if (status) {
      return this.fb.group({
        id: new FormControl(produto.id),
        nome: new FormControl(produto.nome),
        descricao: new FormControl(produto.descricao),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque),
        preco: new FormControl(produto.preco),
        categoria: new FormControl(produto.categoria),
        status: new FormControl(produto.status),
        qtdEstrelas: new FormControl(produto.qtdEstrelas)
      });
    } else {
      return this.fb.group({
        id: new FormControl(produto.id, Validators.required),
        nome: new FormControl(produto.nome, Validators.required),
        descricao: new FormControl(produto.descricao, Validators.required),
        quantidadeEstoque: new FormControl(produto.quantidadeEstoque, Validators.required),
        preco: new FormControl(produto.preco, Validators.required),
        categoria: new FormControl(produto.categoria, Validators.required),
        status: new FormControl(produto.status, Validators.required),
        qtdEstrelas: new FormControl(produto.qtdEstrelas)
      });
    }
  }
  backProdutos() {
    this.router.navigate(['produtos']);
  }

}
