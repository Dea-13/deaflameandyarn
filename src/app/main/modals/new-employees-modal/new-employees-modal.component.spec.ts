import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeesModalComponent } from './new-employees-modal.component';

describe('NewEmployeesModalComponent', () => {
  let component: NewEmployeesModalComponent;
  let fixture: ComponentFixture<NewEmployeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmployeesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
