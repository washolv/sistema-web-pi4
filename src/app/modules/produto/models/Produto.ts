import { Byte } from "@angular/compiler/src/util";

export class Produto {
  id?: number;
  nome?: number;
  descricao?: string;
  preco?: number;
  quantidadeEstoque?: number;
  categoria?: string;
  habilitado?: boolean;
  imagemProduto?: FormData;
}

export class imagem{
  id?: number;
  caminho?: string;
  idProduto?: number;
}
