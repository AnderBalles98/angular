import {Component, OnInit, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import {Destino} from '../../models/Destino.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.module';
import {VoteUpAction, VoteDownAction} from '../../models/destino-state.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: Destino;
  @Input() idx: number;
  @HostBinding('attr.class') cssClass = 'destino-viaje';
  @Output() destinoEmmit: EventEmitter<Destino> = new EventEmitter();

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
  }

  emmitDestino(): boolean {
    this.destinoEmmit.emit(this.destino);
    return false;
  }

  voteUp(): boolean {
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown(): boolean {
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }

}
