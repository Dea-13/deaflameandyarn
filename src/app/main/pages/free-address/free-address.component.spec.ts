import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAddressComponent } from './free-address.component';

describe('FreeAddressComponent', () => {
  let component: FreeAddressComponent;
  let fixture: ComponentFixture<FreeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
