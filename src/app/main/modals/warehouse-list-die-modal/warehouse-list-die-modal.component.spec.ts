import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseListDieModalComponent } from './warehouse-list-die-modal.component';

describe('WarehouseListDieModalComponent', () => {
  let component: WarehouseListDieModalComponent;
  let fixture: ComponentFixture<WarehouseListDieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseListDieModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseListDieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
