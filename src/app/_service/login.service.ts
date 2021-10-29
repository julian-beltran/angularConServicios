import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>
  (false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private url: string = `${environment.HOST}/oauth/token`;

  constructor(private http: HttpClient,
              private router: Router) { }

  public login(usuario: string, password: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    this.loggedIn.next(true);
    return this.http.post<any>(`${this.url}`, body,{
      headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      .set('Authorization', 'Basic ' + btoa(`${environment.TOKEN_AUTH_USERNAME}:${environment.TOKEN_AUTH_PASSWORD}`))
    });
  }
  public cerrarSesion() {
    const tk = sessionStorage.getItem(environment.TOKEN_NAME);
    this.http.get(`${environment.HOST}/cerrarSesion/anular/${tk}`).subscribe(data => {
      sessionStorage.clear();
      this.loggedIn.next(false);
      this.router.navigate(['login']);
    });
  }

  public estaLogueado(): boolean {
    const tk = sessionStorage.getItem(environment.TOKEN_NAME);
    // como el token esta eliminado retorna falso
    return tk != null;
  }
}
