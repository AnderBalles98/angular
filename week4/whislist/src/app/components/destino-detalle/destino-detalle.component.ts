import {Component, OnInit, InjectionToken, Inject, Injectable, inject, forwardRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DestinoAPI} from '../../services/APIDestino.model';
import {Store} from '@ngrx/store';
import {APP_CONFIG, AppCongif, AppState} from 'src/app/app.module';
import {Destino} from 'src/app/models/Destino.model';
import {HttpClient} from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';

@Injectable()
class DestinosApiDecorated extends DestinoAPI {
  constructor(store: Store<AppState>, @Inject(forwardRef(() => APP_CONFIG)) config: AppCongif, http: HttpClient) {
    super(store, config, http);
  }

  getById(id: string): Destino {
    console.log('llamando por la clase decorada!');
    return super.getById(id);
  }
}


class DestinosApiViejo {
  getById(id: string): Destino {
    console.log('llamando por la clase vieja!');
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.scss'],
  providers: [
    {provide: DestinoAPI, useClass: DestinosApiDecorated},
    {provide: DestinosApiViejo, useExisting: DestinoAPI},
  ]
})
export class DestinoDetalleComponent implements OnInit {

  destino: Destino;
  private id: string;
  map: mapboxgl.Map;

  constructor(private route: ActivatedRoute, private destinosAPI: DestinosApiViejo) {
    console.log(destinosAPI);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosAPI.getById(this.id);

    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'destinoDetalleMapBoxContainer', // container Id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-74.0785939, 4.6010792], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });

    let marker = new mapboxgl.Marker({})
      .setLngLat([-74.0785939, 4.6010792])// starting position [lng, lat]
      .addTo(this.map); // add the marker to the map

    let popup = new mapboxgl.Popup({}).setText('Hola mundo');

    marker.setPopup(popup);

    marker.on('click', () => {
      console.log('lng, lat:', marker.getLngLat());
    });


  }

}
