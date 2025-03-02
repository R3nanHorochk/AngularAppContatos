import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPessoa } from '../interfaces/ipessoa';
import { IResponse } from '../interfaces/iresponse';
import { IContats } from '../interfaces/icontats';
import { HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  url2 = environment.url2;
  url3 = environment.url3;
  url = environment.url;
  buscarPessoas(){
    return  this.http.get<IPessoa[]>(`${this.url}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Erro 404: Pessoas não encontradas `);
          return of([]); 
        }
        return throwError(() => new Error('Erro desconhecido ao buscar pessoas.'));
      })
    );
  }

  buscarPessoaPorId(id: number) {
    return this.http.get<IPessoa>(`${this.url}/${id}`);
  }
  buscarContatoPorIdPessoa(id: number) {
    return this.http.get<IContats[]>(`${this.url2}/${id}`);
  }

  cadastrarPessoa(pessoa : IPessoa){
    return this.http.post<IPessoa>(`${this.url}`, pessoa);
  }

  atualizarPessoa(id: string,pessoa : IPessoa){
    return this.http.put<IPessoa>(`${this.url}/${id}`, pessoa);
  }

 deletarPessoa(id: number){
    return this.http.delete<void>(`${this.url}/${id}`);
  }
  deletarContato(id: number){
    return this.http.delete<void>(`${this.url3}/${id}`);
  }
  BuscarTodosContatos(){
    return this.http.get<IContats[]>(`${this.url3}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error(`Erro 404: Contato não encontrado para ID `);
        }
        return throwError(() => new Error('Erro desconhecido ao buscar contatos.'));
      })
    );
  }



  BuscarTodosContatos2(id: number) {
    return this.http.get<IContats[]>(`${this.url3}`, this.httpOptions).pipe(
      map(contatos => contatos.filter(contato => contato.pessoa.id === id))
    );
  }

  cadastrarContato(contato: IContats) {
    return this.http.post<IContats>(`${this.url3}`,contato);
  }

  atualizarContato (id: number,contato: IContats){
    return this.http.put<IContats>(`${this.url3}/${id}`, contato);
  }

  BuscaContatoId (id: number){
    return this.http.get<IContats>(`${this.url3}/${id}`);
  }

}
