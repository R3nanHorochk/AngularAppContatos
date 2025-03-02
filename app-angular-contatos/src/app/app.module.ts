import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListarPessoasComponent } from './pages/listar-pessoas/listar-pessoas.component';
import { CadastroEdicaoComponent } from './pages/cadastro-edicao/cadastro-edicao.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PessoasService } from './services/pessoas.service';
import { EdicaoComponent } from './pages/edicao/edicao.component';
import { FiltroContatoPipe } from './pipes/filtro-contato.pipe';
import { InicialComponent } from './components/inicial/inicial.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { EditarContatoComponent } from './pages/editar-contato/editar-contato.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListarPessoasComponent,
    CadastroEdicaoComponent,
    EdicaoComponent,
    FiltroContatoPipe,
    InicialComponent,
    FooterComponent,
    InfoComponent,
    CadastroContatoComponent,
    EditarContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PessoasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
