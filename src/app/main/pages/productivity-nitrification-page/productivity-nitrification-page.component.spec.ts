import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityNitrificationPageComponent } from './productivity-nitrification-page.component';

describe('ProductivityNitrificationPageComponent', () => {
  let component: ProductivityNitrificationPageComponent;
  let fixture: ComponentFixture<ProductivityNitrificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductivityNitrificationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductivityNitrificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
