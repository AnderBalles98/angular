import { Component, OnInit } from '@angular/core';
import { Destino } from '../models/Destino.model';
import { DestinoAPI } from '../models/APIDestino.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {

  destinos: Destino[];
  updates: string[] = [];


  constructor(private destinoAPI: DestinoAPI) {
    this.destinos = []; // initilize destinos array
    this.destinoAPI.subscribeOnChange((destino: Destino) => {
      if(destino) {
        this.updates.push("se ha añadido " + destino.getNombre());
      }
    });
   }

   guardar(destino: Destino): void {
    this.destinos.push(destino);
   }

  ngOnInit(): void {
  }

  showDestinoSelected(destino: Destino): void {
    this.destinoAPI.setDestinoSelected(destino);
  }

}
