import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiesByMonthComponent } from './dies-by-month.component';

describe('DiesByMonthComponent', () => {
  let component: DiesByMonthComponent;
  let fixture: ComponentFixture<DiesByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiesByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiesByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
