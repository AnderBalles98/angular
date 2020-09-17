import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Destino } from '../models/Destino.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.scss']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino: Destino;
  @HostBinding('attr.class') cssClass = 'destino-viaje';

  constructor() { 
   }

  ngOnInit(): void {
  }

}
