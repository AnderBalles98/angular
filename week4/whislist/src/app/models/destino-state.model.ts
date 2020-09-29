import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Destino} from './Destino.model';


// ESTADO
export interface DestinosState {
  items: Destino[];
  loading: boolean;
  favorito: Destino;
  clicks: number;
}

export const initializeDestinosState = () => {
  return {
    items: [],
    loading: false,
    favorito: null,
    clicks: 0
  };
};

// ACIONES

export enum DestinosActionType {
  NUEVO_DESTINO = '[Destinos] Nuevo',
  ELEGIDO_FAVORITO = '[Destinos] Favorito',
  VOTE_UP = '[Destinos] VoteUp',
  VOTE_DOWN = '[Destinos] VoteDown',
  INIT_MY_DATA = '[Destinos] Init My Data',
  CLICK_ON = '[Destinos] Click On Event'
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

export class VoteUpAction implements Action {
  type = DestinosActionType.VOTE_UP;

  constructor(public destino: Destino) {
  }
}

export class VoteDownAction implements Action {
  type = DestinosActionType.VOTE_DOWN;

  constructor(public destino: Destino) {
  }
}

export class InitMyDataAction implements Action {
  type = DestinosActionType.INIT_MY_DATA;

  constructor(public destinos: any[]) {
  }
}

export class ClickOnAction implements Action {
  type = DestinosActionType.CLICK_ON;
  constructor() {
  }
}

export type DestinosActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteDownAction | VoteUpAction | InitMyDataAction | ClickOnAction;

// REDUCERS

export function reducerDestinos(state: DestinosState, action: DestinosActions): DestinosState {
  console.log(state.items);
  switch (action.type) {
    case DestinosActionType.NUEVO_DESTINO: {
      return { // modificar el state
        ...state, // no se modifica el resto del state
        items: [...state.items, (action as NuevoDestinoAction).destino] // se modifica state.items
      };
    }
    case DestinosActionType.VOTE_UP: {
      const destino: Destino = (action as VoteUpAction).destino;
      destino.voteUp();
      return {
        ...state
      };
    }
    case DestinosActionType.VOTE_DOWN: {
      const destino: Destino = (action as VoteUpAction).destino;
      destino.voteDown();
      return {
        ...state
      };
    }
    case DestinosActionType.ELEGIDO_FAVORITO: {
      console.log(state);
      state.items.forEach((destino: Destino) => {
        destino.setIsSelected(false);
      });
      const fav: Destino = (action as ElegidoFavoritoAction).destino;
      fav.setIsSelected(true);
      return {
        ...state,
        favorito: fav
      };
    }
    case DestinosActionType.INIT_MY_DATA: {
      const destinos: any[] = (action as InitMyDataAction).destinos;
      return {
        ...state,
        items: destinos.map((destino: any) => {
          return new Destino(destino.id, destino.nombre, destino.url, destino.imagenUrl);
        })
      };
    }
    case DestinosActionType.CLICK_ON: {
      console.log(state.clicks);
      return {
        ...state,
        clicks: ++state.clicks
      };
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

