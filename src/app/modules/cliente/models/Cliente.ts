export class Cliente {
  id?: number;
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  cpf?: string;
  sexo?: string;
  dataNascimento?: Date;
  endereco?: Endereco;
}

export class Endereco {
  id?: number;
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
  t?: string;
}
