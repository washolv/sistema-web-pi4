import { SafeResourceUrl } from "@angular/platform-browser";

export class Produto {
  id?: number;
  nome?: number;
  descricao?: string;
  preco?: number;
  quantidadeEstoque?: number;
  categoria?: string;
  status?: number=0;
  qtdEstrelas?: number;
  caminhoImagem?: string[];
  imagens?: Imagem[];
  imageToShow: SafeResourceUrl[]=[];

}


export class Imagem{
  imagem?: File;
  imageToShow?:SafeResourceUrl;
  id?: number;
  caminho?: string;
  imagemPrincipal?: boolean;
}

export class AdicionarImagem{
  imagemProduto?: any;
  favorita?:boolean=false;
}


