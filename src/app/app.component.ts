import { Component, OnInit, HostListener } from '@angular/core';
import { BarraDeProgresoService} from 'src/app/_service/barra-de-progreso.service'
import { LoginService } from './_service/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { GuardianService } from './_share/guardian.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flagProgressBar: boolean = true;
  public flagToolbar:     boolean = true;
  valorProgreso : number;

  isLoading = false;
  constructor(private barraDeProgresoService: BarraDeProgresoService,
              public loginService: LoginService,
              private snackbar: MatSnackBar,
              private guardian: GuardianService){}

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

@HostListener('window:scroll', [])
  onWindowScroll(): void {
    // tslint:disable-next-line: one-variable-per-declaration
    const element = document.documentElement, body = document.body, scrollTop = 'scrollTop',
    scrollHeight = 'scrollHeight';
    this.valorProgreso = (element[scrollTop] || body[scrollTop]) /
    ((element[scrollHeight] || body[scrollHeight]) - element.clientHeight) * 100;
  }

  onLogout() {
    this.loginService.cerrarSesion();
    this.openSnackBar('Sesión cerrada');
    this.guardian.stopFlag.unsubscribe();
  }
  openSnackBar(error: string): void {
    this.snackbar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  @HostListener('window:mousemove') refreshUserState(): void {
    clearTimeout(this.guardian.userActivity);
    this.guardian.setTimeout();
  }
}