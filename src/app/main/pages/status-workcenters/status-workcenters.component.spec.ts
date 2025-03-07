import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWorkcentersComponent } from './status-workcenters.component';

describe('StatusWorkcentersComponent', () => {
  let component: StatusWorkcentersComponent;
  let fixture: ComponentFixture<StatusWorkcentersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusWorkcentersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusWorkcentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
