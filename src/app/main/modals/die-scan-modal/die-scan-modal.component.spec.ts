import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieScanModalComponent } from './die-scan-modal.component';

describe('DieScanModalComponent', () => {
  let component: DieScanModalComponent;
  let fixture: ComponentFixture<DieScanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieScanModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieScanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
