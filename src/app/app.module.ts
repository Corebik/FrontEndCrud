import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//1. Reactive Forms
import{ReactiveFormsModule}from '@angular/forms';
//2. Peticiones HTTP
import{HttpClientModule}from '@angular/common/http';
//3.Tablas de Material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
//4. Controles de Formularios
import{MatFormFieldModule}from'@angular/material/form-field';
import{MatInputModule}from'@angular/material/input';
import{MatSelectModule}from'@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
//5. Alertas
import{MatSnackBarModule}from'@angular/material/snack-bar';
//6.Iconos
import{MatIconModule}from'@angular/material/icon';
//7. Modales
import{MatDialogModule}from'@angular/material/dialog';
//8. Cuadrículas
import{MatGridListModule}from'@angular/material/grid-list';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
