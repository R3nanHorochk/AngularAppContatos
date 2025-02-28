import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastro-edicao.component.html',
  styleUrls: ['./cadastro-edicao.component.css']
})
export class CadastroEdicaoComponent {
  id: number = 0;
  formGroupPessoa: FormGroup = new FormGroup({
   nome: new FormControl('',[Validators.required]),
   endereco: new FormControl('',[Validators.required]),
   cep: new FormControl('',[Validators.required]),
   cidade : new FormControl('',[Validators.required]),
   uf: new FormControl('',[Validators.required])
  });

  constructor(private readonly route : ActivatedRoute, private readonly pessoasService: PessoasService,private readonly router: Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.pessoasService.buscarPessoaPorId(this.id).subscribe(response => {
        console.log(response);
      })
    }
}

test(){

  console.log(this.formGroupPessoa.value);


}
  CadastrarPessoa(){
   const pessoa : IPessoa = this.formGroupPessoa.value;
   this.pessoasService.cadastrarPessoa(pessoa).subscribe( response =>{
     console.log(response);
     this.router.navigate(['/adicionar']);
   })
   console.log(this.formGroupPessoa.value);
  }

}
