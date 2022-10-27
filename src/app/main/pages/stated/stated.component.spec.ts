import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatedComponent } from './stated.component';

describe('StatedComponent', () => {
  let component: StatedComponent;
  let fixture: ComponentFixture<StatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
