import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule} from './material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from '../app/pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    VehiculoComponent,
    AgregarVehiculoComponent,
    NotFoundComponent,
    NotOkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

