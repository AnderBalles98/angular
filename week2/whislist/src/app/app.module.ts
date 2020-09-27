import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule as NgRxStoreModule, ActionReducerMap } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
 
import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { AppRouterModule } from './app-router.moduel';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormDestinoComponent } from './form-destino/form-destino.component';
import { DestinoAPI } from './models/APIDestino.model';
import { DestinosState, reducerDestinos, initializeDestinosState, DestinosEffects } from './models/destino-state.model';


// redux init
export interface AppState {
  destinos: DestinosState;
}

var reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinos
}

var reducersInitialState = {
  destinos: initializeDestinosState()
}


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
    AppRouterModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState, 
      runtimeChecks: { // Malditamente importante
        strictActionImmutability : false, 
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosEffects])
  ],
  providers: [
    DestinoAPI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
