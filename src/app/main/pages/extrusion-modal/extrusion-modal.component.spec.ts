import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrusionModalComponent } from './extrusion-modal.component';

describe('ExtrusionModalComponent', () => {
  let component: ExtrusionModalComponent;
  let fixture: ComponentFixture<ExtrusionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtrusionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtrusionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
