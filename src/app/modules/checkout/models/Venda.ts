import { Cliente, EnderecoCliente } from "../../cliente/models/Cliente";
import { Produto } from "../../produto/models/Produto";
import { Frete } from "./Frete";

export class Venda {
  id?: number;
  dataVenda?: Date;
  valorTotal?: number;
  enderecoCliente?: EnderecoCliente;
  cliente?: Cliente;
  detalhesVenda?:DetalhesVenda[]=[];
  quantidadeTotal?:number=0;
  pagamento?: string;
  frete?: Frete;
}

export class DetalhesVenda {
  id?: number;
  subTotal?: number;
  quantidade?:number=1;
  produto?: Produto;
}
