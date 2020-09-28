import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosMoreInfoComponent } from './vuelos-more-info.component';

describe('VuelosMoreInfoComponent', () => {
  let component: VuelosMoreInfoComponent;
  let fixture: ComponentFixture<VuelosMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelosMoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
