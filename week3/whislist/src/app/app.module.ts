import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule as NgRxStoreModule, ActionReducerMap } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";



import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { AppRoutingModule } from './app-routing.moduel';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormDestinoComponent } from './components/form-destino/form-destino.component';
import { DestinoAPI } from './services/APIDestino.model';
import { DestinosState, reducerDestinos, initializeDestinosState, DestinosEffects } from './models/destino-state.model';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UserLogedGuard } from './guards/user-loged.guard';
import { AuthService } from './services/auth.service';
import { VuelosComponent } from './components/vuelos/vuelos/vuelos.component';
import { VuelosMainComponent } from './components/vuelos/vuelos-main/vuelos-main.component';
import { VuelosMoreInfoComponent } from './components/vuelos/vuelos-more-info/vuelos-more-info.component';
import { VuelosDetailComponent } from './components/vuelos/vuelos-detail/vuelos-detail.component';
import { ReservasModule } from './components/reservas/reservas.module';


// redux init
export interface AppState {
  destinos: DestinosState;
}

var reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinos
};

var reducersInitialState = {
  destinos: initializeDestinosState()
};


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponent,
    VuelosMainComponent,
    VuelosMoreInfoComponent,
    VuelosDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState, 
      runtimeChecks: { // Malditamente importante
        strictActionImmutability : false, 
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    DestinoAPI,
    AuthService,
    UserLogedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  

}
