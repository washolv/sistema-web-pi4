export class Produto {
  id?: number;
  nome?: number;
  descricao?: string;
  preco?: number;
  quantidadeEstoque?: number;
  categoria?: string;
  status?: number;
  imagemProduto?: File;
}

export class imagem{
  id?: number;
  caminho?: string;
  idProduto?: number;
}
