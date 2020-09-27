import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Destino } from '../models/Destino.model';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-form-destino',
  templateUrl: './form-destino.component.html',
  styleUrls: ['./form-destino.component.scss']
})
export class FormDestinoComponent implements OnInit {

  @Output() destino: EventEmitter<Destino> = new EventEmitter();
  inputNombre: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    this.minLenValidator(3)
  ]));
  inputImagenUrl: FormControl = new FormControl('');
  inputUrl: FormControl = new FormControl('', Validators.required);
  formDestino: FormGroup = new FormGroup({
    inputNombre: this.inputNombre,
    inputUrl: this.inputUrl,
    inputImagenUrl: this.inputImagenUrl
  });
  nombrePredicts: string[] = [];

  constructor() {
    this.formDestino.valueChanges.subscribe(function(form: FormGroup) {
      // console.log(form);
    });
  }



  createDestino(): boolean {
    var nombre = this.inputNombre.value;
    var url = this.inputUrl.value;
    var imagenUrl = this.inputImagenUrl.value;
    if (!imagenUrl) {
      imagenUrl = "https://rockcontent.com/es/wp-content/uploads/2019/02/o-que-e-produto-no-mix-de-marketing-1280x720.png";
    }
    var destino = new Destino(nombre, url, imagenUrl);
    this.destino.emit(destino);
    return false;
  }

  // minLenValidator(formControl: FormControl): {[key: string]: boolean} {
  //   const len = formControl.value.toString().length;
  //   if (len>0 && len<5) {
  //     return {minLen: true} // es verdadero cuando no se cumple
  //   }
  //   return null;

  // }

  minLenValidator(minLen: number): ValidatorFn {

    var validator = function(formControl: FormControl): {[key: string]: boolean} {
      const len = formControl.value.toString().trim().length;
      if (len>0 && len<minLen) {
        return {minLen: true} // es verdadero cuando no se cumple
      }
      return null;
    }

    return validator;
  }

  ngOnInit(): void {
    const inputNombreHTMLElement = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(inputNombreHTMLElement, 'input') // se crea el evento input que se acciona al presionar una tecla
      .pipe( // se analiza el flujo de datos
        map(function (e: KeyboardEvent) { // recibe el evento y enviar el valor al siguiente argumento
          return (e.target as HTMLInputElement).value
        }),
        filter(function (text) { // aplica los filtros y envia el valor al siguiente argumento
          return text.length > 2;
        }), 
        debounceTime(500), // aplica un delay para avanzar, este delay se reinicia siempre que se actualize todo lo anterior
        distinctUntilChanged(), // aplica una condicion para avanzat, la condicion es que si no hay cambios no avanza
        switchMap(function () { // realiza un llamado aíncrono a un archivo
          return ajax("/assets/datos.json");
        })
      ).subscribe((ajaxResponse) => {
        this.nombrePredicts = ajaxResponse.response;
      });

  }

}
