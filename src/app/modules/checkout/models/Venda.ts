import { Cliente, EnderecoCliente } from "../../cliente/models/Cliente";
import { Produto } from "../../produto/models/Produto";
import { Frete } from "./Frete";

export class Venda {
  id?: number;
  dataVenda?: Date;
  valorTotal?: number;
  valorParcial?:number;
  desconto?: number;
  parcelasCartao?:number;
  pagamento?:string;
  numeroPedido?: string;
  status?: string;
  enderecoCliente?: EnderecoCliente;
  cliente?: Cliente;
  detalhesVenda?:DetalhesVenda[]=[];
  quantidadeTotal?:number=0;
  frete?: Frete;
  statusvenda?:StatusVenda[];
}

export class DetalhesVenda {
  id?: number;
  subTotal?: number;
  quantidade?:number=1;
  produto?: Produto;
}

export class StatusVenda{
  id?: number;
  descricao?:string;
  data?:Date;
}

