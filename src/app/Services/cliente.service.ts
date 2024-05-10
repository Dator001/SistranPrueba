import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appConfig } from '../app.config';
import { appsettings } from '../Settings/appSettings';
import { Cliente } from '../Models/Cliente';
import { ResponseAPI } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Cliente"

  
  constructor() { }

  lista(){
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Cliente){
    return this.http.post<ResponseAPI>(this.apiUrl,objeto);
  }

  editar(objeto:Cliente){
    return this.http.put<ResponseAPI>(this.apiUrl,objeto);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }

}
