import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTsimbolosComponent } from './modal-tsimbolos.component';

describe('ModalTsimbolosComponent', () => {
  let component: ModalTsimbolosComponent;
  let fixture: ComponentFixture<ModalTsimbolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTsimbolosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTsimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
