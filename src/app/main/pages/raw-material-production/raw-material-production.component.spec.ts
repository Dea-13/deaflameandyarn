import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialProductionComponent } from './raw-material-production.component';

describe('RawMaterialProductionComponent', () => {
  let component: RawMaterialProductionComponent;
  let fixture: ComponentFixture<RawMaterialProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawMaterialProductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
