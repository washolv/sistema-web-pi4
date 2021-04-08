import { Usuario } from "../../funcionario/models/Funcionario";

export class Cliente {
  id?: number;
  nome?: string;
  telefone?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: Date;
  enderecos?: EnderecoCliente[];
  usuario?: Usuario;
}

export class EnderecoCliente {
  id?: number;
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
  descricao?: string;
}
