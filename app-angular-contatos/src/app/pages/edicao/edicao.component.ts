import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/iresponse';
import { pipe } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css']
})
export class EdicaoComponent {
  id: number = 0;
  formGroupPessoa: FormGroup = new FormGroup({
   id : new FormControl(Number(this.route.snapshot.params['id']),[Validators.required]),
   nome: new FormControl('',[Validators.required]),
   endereco: new FormControl('',[Validators.required]),
   cep: new FormControl('',[Validators.required]),
   cidade : new FormControl('',[Validators.required]),
   uf: new FormControl('',[Validators.required])
  });
  constructor(private readonly route : ActivatedRoute, private readonly pessoasService: PessoasService,private readonly router: Router){}
  pessoa: IPessoa ={
    id:  0,
    nome: '',
    cep: '',
    cidade: '',
    endereco:'',
    uf: '',
    ativo: false,
    rua: '',
    bairro: ''
  } ;
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    if (this.id) {
      this.pessoasService.buscarPessoaPorId(this.id).subscribe(response => {
        this.pessoa = response;
        this.pessoa.endereco =  this.pessoa.rua + ' ' + this.pessoa.bairro;
      })
    }

}

EditarPessoa(){

  const pessoa : IPessoa = this.formGroupPessoa.value;
  this.pessoasService.atualizarPessoa
  (this.route.snapshot.params['id'],(pessoa))
  .subscribe( response =>{
    console.log(response);
    Swal.fire({
      icon: 'success',
      title: 'Pessoa atualizada com sucesso',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/editar/'+this.id]);
  })
  console.log(this.formGroupPessoa.value);

 }
}
