import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileModalComponent } from './new-profile-modal.component';

describe('NewProfileModalComponent', () => {
  let component: NewProfileModalComponent;
  let fixture: ComponentFixture<NewProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfileModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
