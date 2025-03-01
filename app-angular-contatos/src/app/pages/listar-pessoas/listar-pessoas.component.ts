import { Data } from './../../../../node_modules/json-server/lib/service.d';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Component, Input } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { IResponse } from 'src/app/interfaces/iresponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IContats } from 'src/app/interfaces/icontats';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pessoas',
  templateUrl: './listar-pessoas.component.html',
  styleUrls: ['./listar-pessoas.component.css']
})
export class ListarPessoasComponent {
  @Input()
  pessoas : IPessoa[] = [];
  contatos : IContats[] = [];
  contatos2 : IContats[] = [];
  contatosLista: { [id: number]: Observable<IContats[]> } = {};//lista do tipo map
  contatosLista2: { [id: number]: IContats[] } = {};//lista do tipo map

  constructor(private PessoasService: PessoasService,private http: HttpClient){

  }

  ngOnInit(): void {
    this.PessoasService.buscarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
    });

    // Buscar todos os contatos
    this.PessoasService.BuscarTodosContatos().subscribe(contatos => {
      this.contatos = contatos;
    });

  }



  editarPessoa(){
    console.log(this.pessoas);


    this.contatos.forEach(p => {
      console.log(p.id);
    });

  }
  condicao(pessoaId : number): Observable<IContats[]> {
    if (!this.contatosLista[pessoaId]) {
      this.contatosLista[pessoaId] = this.PessoasService.buscarContatoPorIdPessoa(pessoaId);
    }
    const existe = this.check(this.contatosLista[pessoaId], pessoaId);
    if (existe) {
      return this.contatosLista[pessoaId];
    }
    return of([]);

  ;
  }
  check(obs : Observable<IContats[]>, pessoaId : number): Observable<boolean> {
    return this.contatosLista[pessoaId].pipe(
      isEmpty()
    );
  }


  excluirContato(contato: IContats){
    this.PessoasService.deletarContato(contato.id).subscribe();
  }
  excluirPessoa(pessoa: IPessoa) {
    console.log(this.contatos);

    this.contatos.forEach(contato => {
      if (contato.pessoa.id == pessoa.id) {
        console.log(this.contatos);
        this.PessoasService.deletarContato(contato.id).subscribe();
      }
    });
    this.PessoasService.deletarPessoa(pessoa.id).subscribe(
      
    );
    Swal.fire({
      icon: 'success',
      title: 'Pessoa Deletada com sucesso',
      showConfirmButton: false,
      timer: 1500
    });setTimeout(() => {
      window.location.reload();
    }, 2000);

}
}
