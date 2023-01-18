import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTestModalComponent } from './generate-test-modal.component';

describe('GenerateTestModalComponent', () => {
  let component: GenerateTestModalComponent;
  let fixture: ComponentFixture<GenerateTestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
