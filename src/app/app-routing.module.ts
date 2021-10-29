import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from '../app/pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [

  {path: '', component:LoginComponent},
  {path: 'vehiculo', component: VehiculoComponent, children :[
        {path: 'agregarVehiculo', component: AgregarVehiculoComponent},
        {path: 'editar/:idVehiculo', component: AgregarVehiculoComponent}
  ]},
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