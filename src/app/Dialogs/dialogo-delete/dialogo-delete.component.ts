import { Component, OnInit, Inject } from '@angular/core';
import{MatDialogRef, MAT_DIALOG_DATA}from'@angular/material/dialog';
import{Registro}from'src/app/Interfaces/registro';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit{
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA)public dataRegistro: Registro
  ){
    
  }

  ngOnInit(): void{
    
  }

  confirmar_Eliminar(){
    if(this.dataRegistro){
      this.dialogoReferencia.close("eliminar")
    }
  }
}
