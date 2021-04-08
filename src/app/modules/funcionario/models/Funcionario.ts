import { UsuarioService } from "src/app/services/usuario.service";

export class Funcionario {
  id?: number;
  nome?: string;
  cpf?: string;
  cargo?: string;
  dataNascimento?: Date;
  endereco?:Endereco;
  telefone?: string;
  usuario?: Usuario;
}
export class Endereco {
  id?: number;
  cep?: string;
  logradouro?:string;
  cidade?:string;
  uf?:string;
}

export class Usuario{
   id?:number;
   username?:string;
   password?: string;
   active?: boolean;
}

