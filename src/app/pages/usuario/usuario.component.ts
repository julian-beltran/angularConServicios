import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorService, UserInfo } from 'src/app/_service/conductor.service';
import { Usuario } from 'src/app/_model/usuario';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionDialogComponent } from '../confirmacion-dialog/confirmacion-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  pageIndex: number = 0;
  pageSize: number = 5;
  lengthPage: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('userPaginator') userPaginator: MatPaginator;

  dialogRef: MatDialogRef<ConfirmacionDialogComponent>;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['nombre', 'apellido', 'nick', 'documento', 'correo', 'rol', 'ciudad', 'ciudad2','editar','eliminar'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource: UserInfo;
  userList = new MatTableDataSource<Usuario>([]);

  constructor(private userServ: ConductorService,
              public route: ActivatedRoute,
              private barraProgresoService: BarraDeProgresoService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  cambiarPag(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("Pagina: "+this.pageIndex);
    console.log("Size: "+this.pageSize);
    this.loadUserInfo();
  }

 loadUserInfo(): void{
  this.barraProgresoService.progressBarReactiva.next(false);
    this.userServ.getUsers(this.pageIndex, this.pageSize).pipe(
      map((uInfo: UserInfo) => this.dataSource = uInfo)
    ).subscribe(data => {
      this.userList = new MatTableDataSource(data.content);
      this.userList.sort = this.sort;
      this.barraProgresoService.progressBarReactiva.next(true);
      
    });
  }
  
  public deleteUser(idUsuario: number): void{
    console.log(idUsuario);

    this.dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = '¿Eliminar el usuario?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userServ.deleteUser(idUsuario).subscribe(data => {
          console.log('Usuario eliminado');
          this.loadUserInfo();
        });
      }

      this.dialogRef = null;
    });

  }

  public listUsers(): void{
    this.userServ.getUsers(this.pageIndex, this.pageSize).pipe(
      map((uInfo: UserInfo) => this.dataSource = uInfo)
    ).subscribe(data => {
      this.userList = new MatTableDataSource(data.content);
      this.userList.sort = this.sort;
    });
  }
  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Información', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }
}
