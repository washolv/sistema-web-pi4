import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/modules/shared/modal-alerta/alert.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { AdicionarImagem, Imagem, Produto } from '../../models/Produto';

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
  public preVisualizacao: AdicionarImagem[] = new Array();
  habilitado: number = 0;
  @Input() selected: boolean = false;

  id: number = 0;
  produtoRetorno = new Produto();
  constructor(private toastr: ToastrService, private modalService: AlertService, private produtoService: ProdutoService, private router: Router) {
    this.nav = router.getCurrentNavigation();
    this.produto = this.nav.extras.state.produto;
  }

  ngOnInit() {
  }

  processFile(event: any) {
    this.files = event.target.files;

    for (let file of this.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        let img = new AdicionarImagem;
        img.imagemProduto = reader.result;
        this.preVisualizacao.push(img);
      }
    }
  }
  public toggleSelected(img: AdicionarImagem, index: number) {

    this.preVisualizacao[this.habilitado].favorita = false;
    img.favorita = true;
    console.log(this.habilitado)
    this.habilitado = index;

    console.log(this.habilitado)
  }
  addProduto() {
    this.produtoService.postProduto(this.produto).subscribe((response: any) => {
      if (response) {
        this.produtoRetorno = response;
        this.SalveImage(this.produtoRetorno.id!)
      }
    }, err => {
      this.toastr.error("Error ao adicionar produto", "Falha", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    });
  }

  SalveImage(id: number) {
    let uploadImageData = new FormData();
    for (const file of this.files) {
      uploadImageData.append('file', file);
    }
    this.produtoService.postFotoProduto(uploadImageData, id, this.habilitado).subscribe((response: any) => {
      if (response) {
        this.toastr.success("Produto cadastrado com sucesso", "Ok", {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/produtos/adicionar']);
      }
    });
  }

  deleteImage(img: AdicionarImagem, i: number): void {
    if (img.favorita) {
      this.toastr.warning("Não é possível deletar uma imagem favoritada", "Atenção", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      return;
    }
    if(i<this.habilitado){
      this.habilitado=this.habilitado-1;
    }
    let listaImagens = new Array()
    let imgs = this.preVisualizacao.filter((a: any) => a !== img);
    console.log(imgs);
    this.preVisualizacao = this.preVisualizacao.filter((a: any) => a !== img);
    for (const file of this.files) {
      if (this.files[i] != file) {
        listaImagens.push(file);
      }
    }
    this.files = listaImagens;
    this.fileList = null;
  }
}
