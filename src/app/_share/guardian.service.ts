import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { LoginService } from '../_service/login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {
  userActivity: any;
  userInactive: Subject<any> = new Subject();

  stopFlag: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private loginService: LoginService,
              private router: Router, 
              private _snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if(this.loginService.estaLogueado() == true) {

          const helper = new JwtHelperService();
          let token = sessionStorage.getItem(environment.TOKEN_NAME);

          if(!helper.isTokenExpired(token)){

            const decodedToken = helper.decodeToken(token);
            const rol: string = decodedToken.authorities[0];
            const url: string = state.url;

            this.stopFlag = this.userInactive.subscribe((data) => {
              this.loginService.cerrarSesion();
              this.openSnackBar('Tiempo de sesión expirado');
              return false;
            });

            if(url.includes('ingresar') && rol === 'Administrador')
              return true;
            else if(url.includes('editar') && rol === 'Administrador')
              return true;
            else if(url.includes('departamento') && rol === 'Administrador')
              return true;
            else if(url.includes('vehiculo') && rol === 'Administrador')
              return true;  
            else if(url.includes('usuario') && rol === 'Administrador')
              return true; 
            else if(url.includes('buscar') && rol === 'Conductor')
              return true;   
            else if(url.includes('conductor') && rol === 'Conductor')
              return true;                                        
            else {
              this.router.navigate(['/nopermiso']);
              return false;
            }

          } else {
            this.loginService.cerrarSesion();
            return false;
          }
      } else {
          this.router.navigate(['/nopermiso']);
          return false;
      }

  }
  openSnackBar(error: string): void {
    this._snackBar.open(error, 'Cerrar', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  setTimeout(): void {
    if (this.loginService.estaLogueado()){
      this.userActivity = setTimeout(() => this.userInactive.next(undefined), 600000);
    }
  }
}