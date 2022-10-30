import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationWarehouseComponent } from './information-warehouse.component';

describe('InformationWarehouseComponent', () => {
  let component: InformationWarehouseComponent;
  let fixture: ComponentFixture<InformationWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
