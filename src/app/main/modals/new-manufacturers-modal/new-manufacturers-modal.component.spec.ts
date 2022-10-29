import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManufacturersModalComponent } from './new-manufacturers-modal.component';

describe('NewManufacturersModalComponent', () => {
  let component: NewManufacturersModalComponent;
  let fixture: ComponentFixture<NewManufacturersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewManufacturersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewManufacturersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
