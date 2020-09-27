import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Destino } from '../models/Destino.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { VoteUpAction, VoteDownAction } from '../models/destino-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: Destino;
  @Input() idx: number;
  @HostBinding('attr.class') cssClass = 'destino-viaje';
  @Output() destinoEmmit: EventEmitter<Destino> = new EventEmitter();
  @Output() deleteDestinoEmmit: EventEmitter<Destino> = new EventEmitter();

  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
  }

  deleteDestino():void {
    this.deleteDestinoEmmit.emit(this.destino);
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
