export class Funcionario {
  id?: number;
  nome?: string;
  cpf?: string;
  cargo?: string;
  status?: boolean;
  dataNascimento?: Date;
  endereco?:Endereco;
  email?: string;
  password?: string;
  telefone?: string;
}
export class Endereco {
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
}
