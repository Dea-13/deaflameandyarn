import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieScanPageComponent } from './die-scan-page.component';

describe('DieScanPageComponent', () => {
  let component: DieScanPageComponent;
  let fixture: ComponentFixture<DieScanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieScanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieScanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
