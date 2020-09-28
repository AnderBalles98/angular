import { NgModule } from '@angular/core';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: ListaDestinosComponent},
    {path: "destino", component: DestinoDetalleComponent}
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRouterModule { }