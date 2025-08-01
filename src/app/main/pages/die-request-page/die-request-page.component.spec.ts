import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieRequestPageComponent } from './die-request-page.component';

describe('DieRequestPageComponent', () => {
  let component: DieRequestPageComponent;
  let fixture: ComponentFixture<DieRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieRequestPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DieRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
