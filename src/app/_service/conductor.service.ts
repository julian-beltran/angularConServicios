import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../_model/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UserInfo{
  
  content: Usuario[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: number;
    unpaged: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private url: string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  public insertUser(u: Usuario): any{
    return this.http.post(`${this.url}/guardar`, u);
  }

  public getUsers(page: number, size: number): Observable<UserInfo>{
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('size', String(size));

    const rol = 4;
    
    return this.http.get<any>(`${this.url}/pageablePorRol/${rol}/${page}/${size}`).pipe(
      map((uInfo: UserInfo) => uInfo),
      catchError(err => throwError(err))
    );
  }

}
