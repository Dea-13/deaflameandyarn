import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMotionComponent } from './no-motion.component';

describe('NoMotionComponent', () => {
  let component: NoMotionComponent;
  let fixture: ComponentFixture<NoMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoMotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
