import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPessoasComponent } from './pages/listar-pessoas/listar-pessoas.component';
import { CadastroEdicaoComponent } from './pages/cadastro-edicao/cadastro-edicao.component';
import { EdicaoComponent } from './pages/edicao/edicao.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [{
  path: 'pessoas',component: ListarPessoasComponent
},{
  path: 'adicionar',component:CadastroEdicaoComponent
}
,{
  path: 'editar/:id',component:EdicaoComponent
},{
  path: '',component: InicialComponent
},{
  path: 'info',component: InfoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
