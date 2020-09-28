import { Component, OnInit } from '@angular/core';
import { Destino } from '../../models/Destino.model';
import { DestinoAPI } from '../../services/APIDestino.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.scss']
})
export class ListaDestinosComponent implements OnInit {

  destinos: Destino[];
  updates: string[] = [];


  constructor(private destinoAPI: DestinoAPI, private store: Store<AppState>) {
    this.destinos = []; // initilize destinos array
    this.store.select((state) => {
      // console.log(state);
      return state.destinos.favorito;
    }).subscribe((destino) => {
      const fav = destino;
      if(destino) {
        this.updates.push("se ha añadido " + destino.getNombre());
      }
    });
    
   }

   guardar(destino: Destino): void {
    this.destinoAPI.add(destino);
    this.destinos = this.destinoAPI.getDestinos();
    // console.log(destino);
    // var nuevodes = new NuevoDestinoAction(destino);

    // this.destinos = this.destinoAPI.getDestinos();
    // this.store.dispatch(new NuevoDestinoAction(destino));
   }

  ngOnInit(): void {
    // this.destinoAPI.subscribeOnChange( (destino: Destino) => {
    //   console.log(this.destinos);
    // });
  }

  showDestinoSelected(destino: Destino): void {
    this.destinoAPI.setDestinoSelected(destino);
    // this.store.dispatch(new ElegidoFavoritoAction(destino));
  }

}
