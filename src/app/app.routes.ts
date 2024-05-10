import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { ClienteComponent } from './Pages/cliente/cliente.component';

export const routes: Routes = [
    {
        path:'',component:InicioComponent
    },
    {
        path:'inicio',component:InicioComponent
    },
    {
        path:'cliente/:id',component:ClienteComponent
    }
];
