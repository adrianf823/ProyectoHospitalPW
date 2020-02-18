import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalAPComponentUser } from './form-modal-ap.component';

describe('FormModalAPComponent', () => {
  let component: FormModalAPComponentUser;
  let fixture: ComponentFixture<FormModalAPComponentUser>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalAPComponentUser ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalAPComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
