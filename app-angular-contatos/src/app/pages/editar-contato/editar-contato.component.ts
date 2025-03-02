import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IContats } from 'src/app/interfaces/icontats';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
 id: number = 0;
  formGroupContato: FormGroup = new FormGroup({
    tipoContato: new FormControl(0,[Validators.required]),
    contato: new FormControl('', [Validators.required]),
    pessoa : new  FormGroup({
      id: new FormControl(0,[Validators.required])
    })
    });
    constructor(private readonly route : ActivatedRoute, private readonly pessoasService: PessoasService,private readonly router: Router){}
    contato: IContats ={
      id:  0,
    tipoContato : '',
    contato : '',
    pessoa : {
      id:  0,
      nome: '',
      cep: '',
      cidade: '',
      endereco:'',
      uf: '',
      ativo: false,
      rua: '',
      bairro: '',
      num: 0
      
    },

    } ;
    ngOnInit(): void {
      
      this.id = Number(this.route.snapshot.params['id']);
      if (this.id) {
        this.pessoasService.BuscaContatoId(this.id).subscribe(response=> {
          this.contato = response;
          
          this.pessoasService.buscarPessoaPorId(response.pessoa.id).subscribe(response => {
            this.contato.pessoa = response;
          })
        })
        
      }
      
  }

    EditarContato(){
       const contato : IContats = this.formGroupContato.value;
       contato.id = this.route.snapshot.params['id'];
       this.pessoasService.atualizarContato(contato.id,contato).subscribe( response =>{
         console.log(response);
         Swal.fire({
               icon: 'success',
               title: 'Contato Atualizado com sucesso',
               showConfirmButton: false,
               timer: 1500
             })
         this.router.navigate(['/pessoas']);
       })
       console.log(this.formGroupContato.value);
      }
      getPessoa(id:number){
        this.pessoasService.buscarPessoaPorId(id).subscribe(pessoas => {
          this.formGroupContato.patchValue({ //atualizar formularios colocar dps em outros
            pessoa: { }
           
          })
          ;
          console.log(pessoas)
        });
      }
}


