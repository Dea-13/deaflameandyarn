import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationMatrixComponent } from './information-matrix.component';

describe('InformationMatrixComponent', () => {
  let component: InformationMatrixComponent;
  let fixture: ComponentFixture<InformationMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
