import { Component } from '@angular/core';
import { BarraDeProgresoService} from 'src/app/_service/barra-de-progreso.service'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public flagProgressBar: boolean = true;
  isLoggedIn$: Observable<boolean>;

  constructor(private barraDeProgresoService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService){}

  ngOnInit(): void {

      this.barraDeProgresoService.progressBarReactiva.subscribe(data =>{
          //this.flagProgressBar = data;  
          this.flagProgressBar = !this.flagProgressBar;
          this.isLoggedIn$ = this.logService.isLoggedIn;
      });
  
  }

  onLogout() {
    this.logService.cerrarSesion();
  }
}