import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatrixModalComponent } from './new-matrix-modal.component';

describe('NewMatrixModalComponent', () => {
  let component: NewMatrixModalComponent;
  let fixture: ComponentFixture<NewMatrixModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMatrixModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMatrixModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
