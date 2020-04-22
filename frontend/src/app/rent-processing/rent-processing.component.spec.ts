import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentProcessingComponent } from './rent-processing.component';

describe('RentProcessingComponent', () => {
  let component: RentProcessingComponent;
  let fixture: ComponentFixture<RentProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
