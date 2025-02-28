import { IPessoa } from "./ipessoa";

export interface IContats {
  id : number,
  tipoContato : string,
  contato : string,
  pessoa : IPessoa,

}
