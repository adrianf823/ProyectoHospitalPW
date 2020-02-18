import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentMed } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentMed;
  let fixture: ComponentFixture<FormModalAPComponentMed>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentMed ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentMed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
