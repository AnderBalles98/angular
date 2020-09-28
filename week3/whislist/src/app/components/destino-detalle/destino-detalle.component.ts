import {Component, OnInit, InjectionToken, Inject, Injectable, inject, forwardRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DestinoAPI} from '../../services/APIDestino.model';
import {Store} from '@ngrx/store';
import {APP_CONFIG, AppConfig, AppState} from 'src/app/app.module';
import {Destino} from 'src/app/models/Destino.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
  class DestinosApiDecorated extends DestinoAPI {
    constructor(store: Store<AppState>, config: AppConfig, http: HttpClient) {
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

  constructor(private route: ActivatedRoute, private destinosAPI: DestinosApiViejo) {
    console.log(destinosAPI);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosAPI.getById(this.id);
  }

}
