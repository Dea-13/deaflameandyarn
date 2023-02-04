import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationExtrusionComponent } from './confirmation-extrusion.component';

describe('ConfirmationExtrusionComponent', () => {
  let component: ConfirmationExtrusionComponent;
  let fixture: ComponentFixture<ConfirmationExtrusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationExtrusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationExtrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
