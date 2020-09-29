import {Directive, ElementRef} from '@angular/core';
import {fromEvent} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.module';
import {ClickOn} from '../models/destino-state.model';

@Directive({
  selector: '[appTrackearClick]'
})
export class TrackearClickDirective {
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef /*El elemnto donde de uso esta directiva*/, private store: Store<AppState>) {
    this.element = elRef.nativeElement;
    fromEvent(this.element, 'click').subscribe(evento => this.track(evento));
  }

  track(evento: Event): void {
    const elemTags = this.element.attributes.getNamedItem('data-trackear-tags').value.split(' ');
    this.store.dispatch(new ClickOn());
    console.log(`||||||||||| track evento: "${elemTags}"`);
  }
}
