import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimbolosComponent } from './simbolos.component';

describe('SimbolosComponent', () => {
  let component: SimbolosComponent;
  let fixture: ComponentFixture<SimbolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimbolosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
