import { Component, inject } from '@angular/core';


import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import {Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private ClienteServicio = inject(ClienteService);
  public listaCliente:Cliente[] = [];
  public displayedColummns : string[] = ['nombre','apellido','numeroDocumento','fechaNaciomiento','telefono1','telefono2','correo1','correo2','nombreCiudad','direccion1','direccion2','accion'];

  obtenerCliente(){
    this.ClienteServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaCliente = data;
          console.log(data);
          console.log(this.listaCliente);
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    this.obtenerCliente();
  }


  nuevo(){
    this.router.navigate(['/cliente',0]);
  }

  editar(objeto:Cliente){
    this.router.navigate(['/cliente',objeto.idCliente]);
  }

  eliminar(objeto:Cliente){
    if(confirm("Desea Eliminar el cliente"+ objeto.nombre + " " + objeto.apellido)){
      this.ClienteServicio.eliminar(objeto.idCliente).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerCliente();
          }else{
            alert("No se pudo eliminar el cliente" +  objeto.nombre +" "+ objeto.apellido)
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
  }}

}
