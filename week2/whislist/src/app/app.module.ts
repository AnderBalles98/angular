import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { AppRouterModule } from './app-router.moduel';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormDestinoComponent } from './form-destino/form-destino.component';
import { DestinoAPI } from './models/APIDestino.model';
@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRouterModule
  ],
  providers: [
    DestinoAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
