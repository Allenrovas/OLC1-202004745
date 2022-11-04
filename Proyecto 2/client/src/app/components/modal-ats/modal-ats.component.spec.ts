import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtsComponent } from './modal-ats.component';

describe('ModalAtsComponent', () => {
  let component: ModalAtsComponent;
  let fixture: ComponentFixture<ModalAtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
