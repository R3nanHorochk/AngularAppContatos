import { Component ,OnInit  } from '@angular/core';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/ipessoa';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-angular-contatos';
  pessoas: IPessoa[] = [];
  constructor(private pessoaService: PessoasService) {}

  ngOnInit(): void {

  }


}
