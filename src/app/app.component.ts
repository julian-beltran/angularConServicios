import { Component, OnInit } from '@angular/core';
import { BarraDeProgresoService} from 'src/app/_service/barra-de-progreso.service'
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flagProgressBar: boolean = true;
  public flagToolbar: boolean = true;

  constructor(private barraDeProgresoService: BarraDeProgresoService,
    public loginService: LoginService){}

  ngOnInit(): void {

    if(this.loginService.estaLogueado() == true) {
      this.flagToolbar = false;
  } else {
      this.flagToolbar = true;
  }

  this.loginService.toolBarReactiva.subscribe(data =>{
    this.flagToolbar = data;
  });

  this.barraDeProgresoService.progressBarReactiva.subscribe(data =>{
      this.flagProgressBar = data;  
      
  });

}

onLogout() {
this.loginService.cerrarSesion();
}
}