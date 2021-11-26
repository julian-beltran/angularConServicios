import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { GuardianService } from 'src/app/_share/guardian.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public estalogueado: boolean;

  constructor(public route: ActivatedRoute, public login: LoginService,
    private snackbar: MatSnackBar,
    private guardian: GuardianService) { }

  ngOnInit(): void {
  }
  onLogout() {
    this.login.cerrarSesion();
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
}
