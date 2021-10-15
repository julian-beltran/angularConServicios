import { Component } from '@angular/core';
import { BarraDeProgresoService} from 'src/app/_service/barra-de-progreso.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public flagProgressBar: boolean = true;
  constructor(private barraDeProgresoService: BarraDeProgresoService){}

  ngOnInit(): void {

      this.barraDeProgresoService.progressBarReactiva.subscribe(data =>{
          //this.flagProgressBar = data;  
          this.flagProgressBar = !this.flagProgressBar;
      });
  
  }
}