import { Destino } from '../models/Destino.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destino-state.model';
import { Injectable } from '@angular/core';


// Se crea una subscripcion a un observable que ejecuta una funcion cuando cambia su valor
@Injectable()
export class DestinoAPI {

    private destinos: Destino[] = [];

    constructor(private store: Store<AppState>) {
        this.store.select((state: AppState) => {
            return state.destinos.items;
        }).subscribe((destinos: Destino[]) => {
            this.destinos = destinos;
        });
    }

    add(destino: Destino): void {
        this.store.dispatch(new NuevoDestinoAction(destino));
    }

    getDestinos(): Destino[] {
        return this.destinos;
    }

    setDestinoSelected(destino: Destino) {
        this.store.dispatch(new ElegidoFavoritoAction(destino));
    }

}