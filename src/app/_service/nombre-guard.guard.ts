import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGGuard implements CanActivate { 

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean>{
      return this.loginService.toolBarReactiva.pipe(
        take(1),
        map((toolBarReactiva: boolean) => {
          if (!toolBarReactiva) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
  }

}
