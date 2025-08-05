import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieRequestModalComponent } from './die-request-modal.component';

describe('DieRequestModalComponent', () => {
  let component: DieRequestModalComponent;
  let fixture: ComponentFixture<DieRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
