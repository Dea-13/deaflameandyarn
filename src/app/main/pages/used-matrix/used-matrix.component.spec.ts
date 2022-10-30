import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedMatrixComponent } from './used-matrix.component';

describe('UsedMatrixComponent', () => {
  let component: UsedMatrixComponent;
  let fixture: ComponentFixture<UsedMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
