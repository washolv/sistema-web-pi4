import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from '../../models/Produto';

@Component({
  selector: 'app-adicionar-imagens-produto',
  templateUrl: './adicionar-imagens-produto.component.html',
  styleUrls: ['./adicionar-imagens-produto.component.css']
})
export class AdicionarImagensProdutoComponent implements OnInit {
  public produto: Produto = new Produto;
  nav: any;
  public files: any = new Array();
  public fileList: any = new Array();
  public preVisualizacao: any = new Array();
  public isNovoProduto: boolean;
  public imageToShow: SafeResourceUrl[] = [];
  public imagens: any;
  id: number = 0;
  produtoRetorno = new Produto();
  constructor(private sanitizer: DomSanitizer, private produtoService: ProdutoService, private router: Router) {
    this.nav = router.getCurrentNavigation();
    this.produto = this.nav.extras.state.produto;

    this.isNovoProduto = typeof this.produto.id == 'undefined';

    if (!this.isNovoProduto) {
      this.produtoService.getImagensProduto(this.produto.id!).subscribe(response => {
        this.imagens = response;
        response.forEach(element =>
          this.imageToShow.push((this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)))
        )
      })
    }
  }

  ngOnInit() {
  }

  processFile(event: any) {
    this.files = event.target.files;

    for (let file of this.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let duplicada = false;

      reader.onload = event => {
        this.preVisualizacao.push(reader.result);
      }
    }
  }

  addProduto() {
     this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if (response) {
        this.produtoRetorno = response;
        this.SalveImage(this.produtoRetorno.id!)
      }
    })
  }
  SalveImage(id: number) {
    let uploadImageData = new FormData();
    let f: File;
    var reader = new FileReader();

    for (const file of this.files) {
      uploadImageData.append('file', file);
    }
    this.produtoService.postFotoProduto(uploadImageData, id).subscribe((response: any) => {
      if (response) {
        this.router.navigate(['/produtos/adicionar']);
      }
    });
  }
  deleteImage(url: any, i: number): void {
    this.preVisualizacao = this.preVisualizacao.filter((a: any) => a !== url);
    for (const file of this.files) {
      if (this.files[i] != file) {
        this.fileList.push(file);
      }
    }
    this.files = this.fileList;
    this.fileList = null;
  }
  deleteImageBanco(url: any, i: number): void {
    let img = this.imagens[i];
    this.produtoService.deleteImagensProduto(img.id!).subscribe(response => {
      sessionStorage.setItem('idProduto', this.produto.id!.toString())
      this.deleteImage(img, i);
      this.router.navigateByUrl('/produtos/adicionar/imagens', {
        state: { produto: this.produto }
      })
    }
    );
  }



}
