import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Destino } from '../models/Destino.model';

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

  constructor() {
   }

  ngOnInit(): void {
  }

  emmitDestino(): boolean {
    this.destinoEmmit.emit(this.destino);
    return false;
  }

}
