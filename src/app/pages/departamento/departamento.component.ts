import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ciudad } from 'src/app/_model/Ciudad';
import { Departamento } from 'src/app/_model/Departamento';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'ver'];
  dataSource = new MatTableDataSource<Departamento>();

  @ViewChild("DepartmentPaginator") paginator: MatPaginator;

  constructor(private departamentoService: DepartamentoService,
              public route: ActivatedRoute,
              private barraProgresoService: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.barraProgresoService.progressBarReactiva.next(false);
    this.departamentoService.listar().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.barraProgresoService.progressBarReactiva.next(true);
    });

  }


}
