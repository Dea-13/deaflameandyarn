import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementMatrixComponent } from './movement-matrix.component';

describe('MovementMatrixComponent', () => {
  let component: MovementMatrixComponent;
  let fixture: ComponentFixture<MovementMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
