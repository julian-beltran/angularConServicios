import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from '../app/pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardianService } from './_share/guardian.service';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RegistrarusuarioComponent } from './pages/usuario/registrarusuario/registrarusuario.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { IndexComponent } from './pages/index/index.component';
import { EditarUsuarioComponent } from './pages/usuario/editar-usuario/editar-usuario.component';


const routes: Routes = [

  { path: '', component: LoginComponent},
  { path: 'index', component: IndexComponent},
  {path: 'departamento', component: DepartamentoComponent, children:[
        {path:'ciudad/:idDep', component: CiudadComponent, canActivate:[GuardianService]}
  ], canActivate: [GuardianService]
},
  {path: 'vehiculo', component: VehiculoComponent, children :[
        {path: 'agregarVehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService]},
        {path: 'editar/:idVehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService]}
  ], canActivate: [GuardianService]
},
{ path: 'usuario', component: UsuarioComponent, canActivate: [GuardianService] , children:
[
  { path: 'registrarusuario', component: RegistrarusuarioComponent, canActivate: [GuardianService]},
  { path: 'editarusuario/:idUsuario', component: EditarUsuarioComponent, canActivate: [GuardianService]}
  
]},
{ path: 'conductor', component: ConductorComponent, canActivate: [GuardianService] },
{ path: 'buscar', component: BuscarComponent, canActivate: [GuardianService] },

  {path: 'login', component:LoginComponent},
  {path: 'nopermiso', component:NotAllowedComponent},
  {path: 'error', component:NotOkComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }