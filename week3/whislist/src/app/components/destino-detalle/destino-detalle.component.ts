import {Component, OnInit, InjectionToken, Inject, Injectable} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoAPI } from '../../services/APIDestino.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { Destino } from 'src/app/models/Destino.model';

interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};
const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


@Injectable()
class DestinosApiDecorated extends DestinoAPI {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  getById(id: string): Destino {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
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
    { provide: DestinoAPI, useClass: DestinosApiDecorated },
    { provide: DestinosApiViejo, useExisting: DestinoAPI },
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
  ],
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
