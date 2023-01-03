import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfileProductsComponent } from './modal-profile-products.component';

describe('ModalProfileProductsComponent', () => {
  let component: ModalProfileProductsComponent;
  let fixture: ComponentFixture<ModalProfileProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProfileProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProfileProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
