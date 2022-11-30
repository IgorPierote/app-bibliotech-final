import { LivroBibliotechComponent } from './views/livro-bibliotech/livro-bibliotech.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import{NovoEmprestimoComponent} from './views/novo-emprestimo/novo-emprestimo.component';
import { EditarEmprestimoComponent } from './views/editar-emprestimo/editar-emprestimo.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Bibliotech"
  },
   {
    path: 'novo-emprestimo',
    component: NovoEmprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Novo emprestimo | Bibliotech"
  },
  {
    path: 'livro-bibliotech',
    component: LivroBibliotechComponent,
    canActivate: [ AuthGuard ],
    title: "Editar Livro | Bibliotech"
  },
  {
    path:'dashboard/edit/:id',
    component: EditarEmprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Editar Emprestimo | Bibliotech"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
