import { Component, OnInit, Inject } from '@angular/core';

import{FormBuilder,FormGroup,Validators}from'@angular/forms';
import{MatDialogRef, MAT_DIALOG_DATA}from'@angular/material/dialog';
import{MatSnackBar}from'@angular/material/snack-bar';

import{Casa}from'src/app/Interfaces/casa';
import{Registro}from'src/app/Interfaces/registro';
import{CasaService}from'src/app/Services/casa.service';
import{RegistroService}from'src/app/Services/registro.service';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {

  formRegistro:FormGroup;
  tituloAccion:string = "Nuevo";
  botonAccion:string = "Guardar";
  listaCasas: Casa[]=[];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private _casaServicio: CasaService,
    private _registroServicio: RegistroService,
    @Inject (MAT_DIALOG_DATA)public dataRegistro: Registro

 ){
  this.formRegistro = this.fb.group({
    nombre: ['',[Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-zñÑá-úÁ-Ú\s\xF1\xD1]+$/)]],
    apellido: ['',[Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-zñÑá-úÁ-Ú\s\xF1\xD1]+$/)]],
    identificacion: ['',[Validators.required, Validators.maxLength(10), Validators.pattern(/^([0-9])*$/)]],
    edad: ['',[Validators.required, Validators.maxLength(2), Validators.pattern(/^([0-9])*$/)]],
    refCasa: ['',Validators.required]
  })

  this._casaServicio.getList().subscribe({
    next:(data)=>{
      this.listaCasas = data;
    },error:(e)=>{}
  })

 }

 mostrarAlerta(msg: string, accion: string) {
  this._snackBar.open(msg, accion,{
    horizontalPosition:"end",
    verticalPosition:"top",
    duration: 3000
  });
}

addEditRegistro(){
  //console.log(this.formRegistro)
  console.log(this.formRegistro.value)

  const modelo: Registro = {
    idRegistro:0,
    nombre: this.formRegistro.value.nombre,
    apellido: this.formRegistro.value.apellido,
    identificacion: this.formRegistro.value.identificacion,
    edad: this.formRegistro.value.edad,
    refCasa: this.formRegistro.value.refCasa
  }

  if(this.dataRegistro == null){

    this._registroServicio.add(modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("El registro ha sido creado exitosamente","Listo");
        this.dialogoReferencia.close("creado")
      },error:(e)=>{
        this.mostrarAlerta("No se puedo crear","Error");
      }
    })

  }else{

    this._registroServicio.update(this.dataRegistro.idRegistro, modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("El registro ha sido actualizado exitosamente","Listo");
        this.dialogoReferencia.close("editado")
      },error:(e)=>{
        this.mostrarAlerta("No se puedo editar","Error");
      }
    })
  }

}

/*validateFormat(evento:any) {
  let key;
  if (evento.type === 'paste') {
    key = evento.clipboardData.getData('text/plain');
  } else {
    key = evento.keyCode;
    key = String.fromCharCode(key);
  }
  const regex = /[0-9]|\./;
   if (!regex.test(key)) {
    evento.returnValue = false;
     if (evento.preventDefault) {
      evento.preventDefault();
     }
   }
  } */

  ngOnInit():void{
    if(this.dataRegistro){

      this.formRegistro.patchValue({
        nombre:this.dataRegistro.nombre,
        apellido:this.dataRegistro.apellido,
        identificacion:this.dataRegistro.identificacion,
        edad:this.dataRegistro.edad,
        refCasa:this.dataRegistro.refCasa
      })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
}
