import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Destino } from '../models/Destino.model';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

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

  constructor() {
    this.formDestino.valueChanges.subscribe(function(form: FormGroup) {
      console.log(form);
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
  }

}
