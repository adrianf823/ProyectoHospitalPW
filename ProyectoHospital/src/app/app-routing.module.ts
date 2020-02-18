import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MedicosComponent} from './Components/medicos/medicos.component'
import {HospitalesComponent} from './Components/hospitales/hospitales.component'
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './Components/login/login.component';
import {AuthGuard} from './guards/auth.guard'

const routes: Routes = [
  { path: 'medicos', component: MedicosComponent, canActivate:[AuthGuard]},
  { path: 'registro', component: RegistroComponent },
  { path: 'hospitales', component: HospitalesComponent, canActivate:[AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard] },
  //{ path: 'buscar/:termino', component: BuscarComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
