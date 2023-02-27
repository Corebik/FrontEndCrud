import { Injectable } from '@angular/core';

import{HttpClient}from'@angular/common/http';
import{environment}from'src/environments/environment';
import{Observable}from'rxjs';
import{Casa}from'../Interfaces/casa';

@Injectable({
  providedIn: 'root'
})
export class CasaService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint+"casa/";


  constructor(private http:HttpClient) { }

  getList():Observable<Casa[]>{
    return this.http.get<Casa[]>(`${this.apiUrl}lista`);
  }

}
