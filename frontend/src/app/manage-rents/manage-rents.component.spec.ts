import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRentsComponent } from './manage-rents.component';

describe('ManageRentsComponent', () => {
  let component: ManageRentsComponent;
  let fixture: ComponentFixture<ManageRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
