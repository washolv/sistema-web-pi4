import { Usuario } from "../../funcionario/models/Funcionario";

export class Cliente {
  id?: number;
  nome?: string;
  sobrenome?:string;
  telefone?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: Date;
  enderecoCobranca?: EnderecoCliente;
  enderecos?: EnderecoCliente[]=[];
  usuario?: Usuario;
}

export class EnderecoCliente {
  id?: number;
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
  clienteId?:string;
  status?: boolean;
  nomeDestinatario?: boolean;
  bairro?: boolean;
  complemento?: string;
  numero?: number;
  principal?: boolean;
}
