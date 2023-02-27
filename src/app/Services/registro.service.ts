import { Injectable } from '@angular/core';

import{HttpClient}from'@angular/common/http';
import{environment}from'src/environments/environment';
import{Observable}from'rxjs';
import{Registro}from'../Interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint+"registro/";

  constructor(private http:HttpClient) { }

  getList():Observable<Registro[]>{
    return this.http.get<Registro[]>(`${this.apiUrl}lista`);
  }

  add(modelo:Registro):Observable<Registro>{
    return this.http.post<Registro>(`${this.apiUrl}guardar`,modelo);
  }

  update(idRegistro:number,modelo:Registro):Observable<Registro>{
    return this.http.put<Registro>(`${this.apiUrl}actualizar/${idRegistro}`,modelo);
  }

  delete(idRegistro:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${idRegistro}`);
  }

}
