import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule,} from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Cliente } from '../../Models/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit{
  @Input('Id')idCliente!:number
  private clienteServicio = inject(ClienteService);
  public formBuild = inject(FormBuilder);

  public formCliente:FormGroup = this.formBuild.group({
    nombre:[''],
    apellido:[''],
    idTipoDocumento:[''],
    numeroDocumento:[''],
    fechaNaciomiento:[''],
    telefono1:[''],
    telefono2:[''],
    correo1:[''],
    correo2:[''],
    idCiudad:[''],
    nombreCiudad:[''],
    direccion1:[''],
    direccion2:[''],

  })

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.idCliente != 0){
      this.clienteServicio.obtener(this.idCliente).subscribe({
        next:(data) =>{
          this.formCliente.patchValue({
            nombre:data.nombre,
            apellido:data.apellido,
            idTipoDocumento:data.idTipoDocumento,
            numeroDocumento:data.numeroDocumento,
            fechaNaciomiento:data.fechaNaciomiento,
            telefono1:data.telefono1,
            telefono2:data.telefono2,
            correo1:data.correo1,
            correo2:data.correo2,
            idCiudad:data.idCiudad,
            nombreCiudad:data.nombreCiudad,
            direccion1:data.direccion1,
            direccion2:data.direccion2,
          })
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

  guardar(){
    const objeto: Cliente ={
      idCliente: this.idCliente ,
      nombre: this.formCliente.value.nombre,
      apellido: this.formCliente.value.apellido ,
      idTipoDocumento: this.formCliente.value.idTipoDocumento ,
      TipoDocumento: this.formCliente.value.TipoDocumento,
      numeroDocumento: this.formCliente.value.numeroDocumento ,
      fechaNaciomiento: this.formCliente.value.fechaNaciomiento ,
      telefono1: this.formCliente.value.telefono1 ,
      telefono2: this.formCliente.value.telefono2,
      correo1: this.formCliente.value.correo1,
      correo2: this.formCliente.value.correo2,
      idCiudad: this.formCliente.value.idCiudad,
      nombreCiudad: this.formCliente.value.nombreCiudad,
      direccion1: this.formCliente.value.direccion1,
      direccion2: this.formCliente.value.direccion2
    }

    if(this.idCliente == 0 || this.idCliente == null){
      this.clienteServicio.crear(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess == true){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }else{
      this.clienteServicio.editar(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }

}
