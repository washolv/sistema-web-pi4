import { Cliente, EnderecoCliente } from "../../cliente/models/Cliente";
import { Produto } from "../../produto/models/Produto";

export class Venda {
  id?: number;
  dataVenda?: Date;
  valorTotal?: number;
  enderecoCliente?: EnderecoCliente;
  cliente?: Cliente;
  detalhesVenda?:DetalhesVenda[]=[];
}

export class DetalhesVenda {
  id?: number;
  subtotal?: number;
  produto?: Produto;
}
