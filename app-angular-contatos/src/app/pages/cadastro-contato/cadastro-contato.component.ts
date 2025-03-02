import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PessoasService } from 'src/app/services/pessoas.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { IContats } from 'src/app/interfaces/icontats';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.css']
})
export class CadastroContatoComponent {
  id: number = 0;
  formGroupContato: FormGroup = new FormGroup({
    tipoContato: new FormControl(0,[Validators.required]),
    contato: new FormControl('', [Validators.required]),
    pessoa : new  FormGroup({
      id: new FormControl(0,[Validators.required])
    })
    });
    constructor(private readonly route : ActivatedRoute, private readonly pessoasService: PessoasService,private readonly router: Router){}
    
    CadastrarContato(){
       const contato : IContats = this.formGroupContato.value;
       this.pessoasService.cadastrarContato(contato).subscribe( response =>{
         console.log(response);
         Swal.fire({
               icon: 'success',
               title: 'Pessoa Adicionada com sucesso',
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
