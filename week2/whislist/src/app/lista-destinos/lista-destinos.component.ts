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

   guardar(nombre: string, url:string, imagenUrl: string): boolean {
     if (!imagenUrl){
      imagenUrl = "https://rockcontent.com/es/wp-content/uploads/2019/02/o-que-e-produto-no-mix-de-marketing-1280x720.png";
     }
    var destino = new Destino(nombre, url, imagenUrl);
    this.destinos.push(destino);
    return false;
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
