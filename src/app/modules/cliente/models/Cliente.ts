export class Cliente {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: Date;
  endereco?: EnderecoCliente[];
}

export class EnderecoCliente {
  id?: number;
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
  descricao?: string;
}
