import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';

import{Registro}from'./Interfaces/registro';
import{RegistroService}from'./Services/registro.service';

import{MatSnackBar}from'@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog';

import{DialogAddEditComponent}from'./Dialogs/dialog-add-edit/dialog-add-edit.component';

import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Identificacion', 'Edad', 'Casa', 'Acciones'];
  dataSource = new MatTableDataSource<Registro>();

  constructor(
    private _registroServicio:RegistroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private paginators: MatPaginatorIntl
  ){
    this.paginators.itemsPerPageLabel = "Registros por página";
    this.paginators.firstPageLabel = "Primera página";
    this.paginators.lastPageLabel = "Última página";
    this.paginators.nextPageLabel = "Página siguiente";
    this.paginators.previousPageLabel = "Página anterior";
    console.log(this.paginators);
  }

  ngOnInit(): void {
    this.mostrarRegistros();
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarRegistros(){
    this._registroServicio.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e)=>{}
    })
  }

  dialogoNuevoRegistro() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado==="creado")
      this.mostrarRegistros();
    })
  }

  dialogoEditarRegistro(dataRegistro: Registro) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data:dataRegistro
    }).afterClosed().subscribe(resultado => {
      if(resultado==="editado")
      this.mostrarRegistros();
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }

  dialogoEliminarRegistro(dataRegistro:Registro){
    this.dialog.open(DialogoDeleteComponent,{
      disableClose:true,
      data:dataRegistro
    }).afterClosed().subscribe(resultado => {
      if(resultado==="eliminar")
      this._registroServicio.delete(dataRegistro.idRegistro).subscribe({
        next:(data)=>{
          this.mostrarAlerta("El registro ha sido Eliminado","Listo");
          this.mostrarRegistros();
        },error:(e)=>{}
      })
    })
  }

}
