import { Component, OnInit } from '@angular/core';
import { Destino } from '../models/Destino.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {

  destinos: Destino[];

  constructor() {
    this.destinos = []; // initilize destinos array
   }

   guardar(destino: Destino): void {
    this.destinos.push(destino);
   }

  ngOnInit(): void {
  }

  showDestinoSelected(destino: Destino): void {
    this.destinos.forEach(function (destino) {
      destino.setIsSelected(false);
    });
    destino.setIsSelected(true);
  }

}
