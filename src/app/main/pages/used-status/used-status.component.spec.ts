import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedStatusComponent } from './used-status.component';

describe('UsedStatusComponent', () => {
  let component: UsedStatusComponent;
  let fixture: ComponentFixture<UsedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
