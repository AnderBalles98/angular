import { Destino } from '../models/Destino.model';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import { Store } from '@ngrx/store';
import {APP_CONFIG, AppCongif, AppState} from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destino-state.model';
import {forwardRef, Inject, inject, Injectable} from '@angular/core';


@Injectable()
export class DestinoAPI {

    private destinos: Destino[] = [];

    constructor(private store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) private config: AppCongif,
                private http: HttpClient) {
        this.store.select((state: AppState) => {
            return state.destinos.items;
        }).subscribe((destinos: Destino[]) => {
            this.destinos = destinos;
        });
    }

  add(d: Destino): void {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d }, { headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
      }
    });
  }

    getDestinos(): Destino[] {
        return this.destinos;
    }

    getById(id: string): Destino {
        return this.destinos.filter((destino) => {
            return destino.getId() === id;
        })[0];
    }

    setDestinoSelected(destino: Destino): void {
        this.store.dispatch(new ElegidoFavoritoAction(destino));
    }

}
