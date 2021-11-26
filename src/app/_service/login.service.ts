import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  private url: string = `${environment.HOST}/oauth/token`;

  public toolBarReactiva = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router) { }

  public login(usuario: string, password: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    
    return this.http.post<any>(`${this.url}`, body,{
      headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
    });
  }
  public cerrarSesion() {
    const tk = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data => {
      sessionStorage.clear();
      this.router.navigate(['login']);
      this.toolBarReactiva.next(true);
    });
  }

  public estaLogueado(): boolean {
    const tk = sessionStorage.getItem(environment.TOKEN_NAME);
    return tk != null;
  }

  public rolType(): string{
    const helper = new JwtHelperService();

    const tk = sessionStorage.getItem(environment.TOKEN_NAME);

    const decodedToken = helper.decodeToken(tk);

    return decodedToken.authorities;
  }
}
