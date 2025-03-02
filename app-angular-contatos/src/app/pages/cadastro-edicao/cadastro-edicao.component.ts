import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastro-edicao.component.html',
  styleUrls: ['./cadastro-edicao.component.css']
})
export class CadastroEdicaoComponent {
  id: number = 0;
  rua: string = ''; 
  bairro: string = '';
  endereco2: string ='';
  num: number = 0;
  formGroupPessoa: FormGroup = new FormGroup({
   nome: new FormControl('',[Validators.required]),
   endereco: new FormControl('', [Validators.required]),
   cep: new FormControl('',[Validators.required]),
   cidade : new FormControl('',[Validators.required]),
   uf: new FormControl('',[Validators.required])
  });

  constructor(private readonly route : ActivatedRoute, private readonly pessoasService: PessoasService,private readonly router: Router){}

  ngOnInit(): void {
    
}
AtualizarBairro(event: any){
  this.bairro = event.target.value as string;
  this.concatenarEndereco();
}
AtualizarRua(event: any) {
  
  this.rua = event.target.value as string;
  this.concatenarEndereco();  
}
AtualizarN(event: any) {
  
  this.num = event.target.value as number;
  this.concatenarEndereco();  
}
concatenarEndereco() {
  
  this.endereco2 = `${this.rua} - ${this.num} - ${this.bairro} `;
  
  
  this.formGroupPessoa.patchValue({
    endereco: this.endereco2
  });
}

  CadastrarPessoa(){
   const pessoa : IPessoa = this.formGroupPessoa.value;
   this.pessoasService.cadastrarPessoa(pessoa).subscribe( response =>{
     console.log(response);
     Swal.fire({
           icon: 'success',
           title: 'Pessoa Adicionada com sucesso',
           showConfirmButton: false,
           timer: 1500
         })
     this.router.navigate(['/adicionar']);
   })
   console.log(this.formGroupPessoa.value);
  }

}
