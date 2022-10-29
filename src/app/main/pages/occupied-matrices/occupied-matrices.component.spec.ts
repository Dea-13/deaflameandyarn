import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedMatricesComponent } from './occupied-matrices.component';

describe('OccupiedMatricesComponent', () => {
  let component: OccupiedMatricesComponent;
  let fixture: ComponentFixture<OccupiedMatricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupiedMatricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OccupiedMatricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
