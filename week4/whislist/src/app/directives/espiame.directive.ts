import {Directive, OnInit, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appEspiame]'
})
export class EspiameDirective implements OnDestroy, OnInit {

  static nextId = 0;

  constructor() {
  }

  log(msg: string): void {
    console.log(`Evento #${EspiameDirective.nextId++} ${msg}`);
  }

  ngOnInit(): void {
    this.log(`########******** onInit`);
  }

  ngOnDestroy(): void {
    this.log(`########******** onDestroy`);
  }
}
