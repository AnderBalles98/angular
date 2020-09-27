import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Destino } from './Destino.model';


// ESTADO
export interface DestinosState {
    items: Destino[];
    loading: boolean,
    favorito: Destino
}

export const initializeDestinosState = function () {
    return {
        items: [],
        loading: false,
        favorito: null
    }
}

// ACIONES

export enum DestinosActionType {
    NUEVO_DESTINO = '[Destinos] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos] Favorito'
}

export class NuevoDestinoAction implements Action {
    type = DestinosActionType.NUEVO_DESTINO;
    constructor(public destino: Destino) {

    }
}

export class ElegidoFavoritoAction implements Action {
    type = DestinosActionType.ELEGIDO_FAVORITO;
    constructor(public destino: Destino) {

    }
}

export type DestinosActions = NuevoDestinoAction | ElegidoFavoritoAction;

// REDUCERS

export function reducerDestinos(state: DestinosState, action: DestinosActions): DestinosState {
    console.log(state.items);
    switch(action.type) {
        case DestinosActionType.NUEVO_DESTINO: {
            return { // modificar el state
                ...state, // no se modifica el resto del state
                items: [...state.items, (action as NuevoDestinoAction).destino] // se modifica state.items
            }
        }
        case DestinosActionType.ELEGIDO_FAVORITO: {
            console.log(state);
            state.items.forEach((destino: Destino) => {
                destino.setIsSelected(false);
            });
            var fav: Destino = (action as ElegidoFavoritoAction).destino;
            fav.setIsSelected(true);
            return {
                ...state,
                favorito: fav
            }
        }
    }
    return state;
}


// EFECTS
@Injectable()
export class DestinosEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(DestinosActionType.NUEVO_DESTINO),  // avanza si es de tipo nuevo destino
        map((action: NuevoDestinoAction) => { // se elige como favorito
            return new ElegidoFavoritoAction(action.destino);
        })
    );

    constructor(private actions$: Actions) {

    }
}

