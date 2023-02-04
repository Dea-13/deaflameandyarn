import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletRawMaterialsComponent } from './billet-raw-materials.component';

describe('BilletRawMaterialsComponent', () => {
  let component: BilletRawMaterialsComponent;
  let fixture: ComponentFixture<BilletRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilletRawMaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilletRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
