import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  // variables de usuario
  usuario: FormControl = new FormControl('',
    [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(7),
    Validators.pattern(/[a-zA-Z0-9]/)
    ]
  );

  contrasena: FormControl = new FormControl('',
    [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(15),
    Validators.pattern(/[a-zA-Z0-9]/)
    ]
  );

  constructor(private loginService: LoginService,
              public fb: FormBuilder,
              private router: Router,
              public route : ActivatedRoute
              ) { }
  ngOnInit(): void {
  }

  login() {
    // 'admin'    '123456'
    this.loginService.login(this.usuario.value, this.contrasena.value).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      this.router.navigate(['/vehiculo']);
      this.loginService.toolBarReactiva.next(false);
    });

  }



}