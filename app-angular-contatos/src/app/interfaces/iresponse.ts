import { IPessoa } from "./ipessoa";

export interface IResponse {
  id: number;
  nome: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
}

