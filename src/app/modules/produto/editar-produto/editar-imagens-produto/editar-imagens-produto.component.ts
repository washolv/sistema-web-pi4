import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produto.service';
import { Imagem, Produto } from '../../models/Produto';

@Component({
  selector: 'app-editar-imagens-produto',
  templateUrl: './editar-imagens-produto.component.html',
  styleUrls: ['./editar-imagens-produto.component.css']
})
export class EditarImagensProdutoComponent implements OnInit {
  public imageToShow: Imagem[] = new Array();
  public imagens: any;
  public produto: Produto = new Produto;
  public files: any = new Array();
  public fileList: any = new Array();
  public novasImagems: any = new Array();
  public imagensUpload: FormData = new FormData;
  id: number = 0;
  constructor(private toastr: ToastrService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private produtoService: ProdutoService, private router: Router) {
    this.route.params.subscribe(parametros => {
      this.id = parametros['id'];
    });

  }

  ngOnInit() {
    this.produtoService.getProdutoById(this.id).subscribe(resp => {
      this.produto = resp;
    })
    this.produtoService.getImagensProduto(this.id).subscribe(response => {
      this.imagens = response;
      response.forEach(element => {
        const t = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.imagem}`)
        let img = new Imagem();
        img.id = element.id;
        img.imagem = element.imagem;
        img.imageToShow = t;
        img.caminho = element.caminho;
        img.imagemPrincipal = element.imagemPrincipal;
        this.imageToShow.push(img);
      }
      )
    })
  }

  enviar() {
    for (const file of this.files) {
      this.imagensUpload.append('file', file);
    }
    this.produtoService.postFotoProduto(this.imagensUpload, this.produto.id!, -1).subscribe(response => {
      this.toastr.success("Imagens adicionadas com sucesso", "Ok", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      window.location.reload();
    })
    this.novasImagems.length = null;
  }
  processFile(event: any) {
    for (let file of event.target.files) {
      this.files.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.novasImagems = this.novasImagems.filter((a: any) => a !== reader.result);
        this.novasImagems.push(reader.result)
      }
    }
  }
  deleteImage(url: any, i: number): void {
    this.novasImagems = this.novasImagems.filter((a: any) => a !== url);
    for (const file of this.files) {
      if (this.files[i] != file) {
        this.fileList.push(file);
      }
    }
    this.files = this.fileList;
    this.fileList = null;
  }
  deleteImageBanco(img: Imagem): void {
    if (img.imagemPrincipal) {
      this.toastr.warning("Não é possível deletar uma imagem favoritada", "Atenção", {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      return;
    }
    this.produtoService.deleteImagensProduto(img.id!).subscribe(response => {
      window.location.reload();
    });
  }

  backProdutos() {
    this.router.navigate(['produtos/editar', this.produto.id]);
  }
  public toggleSelected(img: Imagem) {
    for (let imgP of this.imageToShow) {
      if (imgP.imagemPrincipal) {
        imgP.imagemPrincipal = false;
      }
    }
    img.imagemPrincipal = true;
    this.produtoService.postFotoFavorita(img.id!, this.produto.id!).subscribe(response => {
      this.toastr.success("Nova imagem favoritada", "Ok", {
        timeOut: 3000, positionClass: 'toast-top-center',
      })},
       err=>{
      this.toastr.error("Erro ao Favoritar Imagem", "Error", {
        timeOut: 3000, positionClass: 'toast-top-center',
      }
      )}

    );
  }
}
