import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, Injectable, InjectionToken, NgModule} from '@angular/core';

import {StoreModule as NgRxStoreModule, ActionReducerMap, Store} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

// http client
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';

import {AppComponent} from './app.component';
import {DestinoViajeComponent} from './components/destino-viaje/destino-viaje.component';
import {ListaDestinosComponent} from './components/lista-destinos/lista-destinos.component';
import {DestinoDetalleComponent} from './components/destino-detalle/destino-detalle.component';
import {AppRoutingModule} from './app-routing.moduel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDestinoComponent} from './components/form-destino/form-destino.component';
import {
  DestinosState,
  reducerDestinos,
  initializeDestinosState,
  DestinosEffects,
  InitMyDataAction
} from './models/destino-state.model';
import {LoginComponent} from './components/login/login.component';
import {ProtectedComponent} from './components/protected/protected.component';
import {UserLogedGuard} from './guards/user-loged.guard';
import {AuthService} from './services/auth.service';
import {VuelosComponent} from './components/vuelos/vuelos/vuelos.component';
import {VuelosMainComponent} from './components/vuelos/vuelos-main/vuelos-main.component';
import {VuelosMoreInfoComponent} from './components/vuelos/vuelos-more-info/vuelos-more-info.component';
import {VuelosDetailComponent} from './components/vuelos/vuelos-detail/vuelos-detail.component';
import {ReservasModule} from './components/reservas/reservas.module';
import {Destino} from './models/Destino.model';

// dexie
import Dexie from 'dexie';

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) {
  }

  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUES.apiEndpoint + '/my', {headers});
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}

// dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos: Dexie.Table<Destino, number>;
  translations: Dexie.Table<Translation, number>;

  constructor() {
    super('WishListDataBase');
    this.version(1).stores({
      destinos: '++id, nombre, url, imagenUrl'
    });
  }
}

export const db = new MyDatabase();

// app config
export interface AppCongif {
  apiEndpoint: string;
}

const APP_CONFIG_VALUES: AppCongif = {
  apiEndpoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppCongif>('app.config');

// redux init
export interface AppState {
  destinos: DestinosState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinos
};

const reducersInitialState = {
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
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgRxStoreModule.forRoot(reducers, {
      initialState: reducersInitialState,
      runtimeChecks: { // Malditamente importante
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule
  ],
  providers: [
    AuthService,
    UserLogedGuard,
    {provide: APP_CONFIG, useValue: APP_CONFIG_VALUES},
    AppLoadService,
    {
      provide: APP_INITIALIZER, /*Nativo de Angular, inizializa con la aplicación*/
      useFactory: init_app,
      deps: [AppLoadService],
      multi: true /*Neceario para tener multiples inicializaciones*/
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
