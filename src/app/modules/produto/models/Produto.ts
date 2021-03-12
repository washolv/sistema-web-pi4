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
}


export class Imagem{
  imagem?: File;
  id?: number;
  caminho?: string;
  imagemPrincipal?: boolean;
}


