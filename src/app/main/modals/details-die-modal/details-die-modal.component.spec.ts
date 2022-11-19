import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDieModalComponent } from './details-die-modal.component';

describe('DetailsDieModalComponent', () => {
  let component: DetailsDieModalComponent;
  let fixture: ComponentFixture<DetailsDieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDieModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
