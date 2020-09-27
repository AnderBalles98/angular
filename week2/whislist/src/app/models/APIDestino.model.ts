import { Destino } from './Destino.model';
import { Subject, BehaviorSubject } from 'rxjs';


// Se crea una subscripcion a un observable que ejecuta una funcion cuando cambia su valor
export class DestinoAPI {
    private destinos: Destino[] = [];
    current: Subject<Destino> = new BehaviorSubject<Destino>(null); // este es un observable

constructor() {

}

add(destino: Destino): void {
    this.destinos.push(destino);
}

getDestinos(): Destino[] {
    return this.destinos;
}

getById(id: string): Destino {
    return this.destinos.filter(function (destino: Destino) {
        return destino.getId() === id;
    })[0];
}

setDestinoSelected(destino: Destino) {
    this.destinos.forEach(function (destino) {
        destino.setIsSelected(false);
    });

    destino.setIsSelected(true);

    this.current.next(destino);
}

subscribeOnChange(callback) { // esta es la subscripcion
    this.current.subscribe(callback);
}

}