import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosDetailComponent } from './vuelos-detail.component';

describe('VuelosDetailComponent', () => {
  let component: VuelosDetailComponent;
  let fixture: ComponentFixture<VuelosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelosDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
