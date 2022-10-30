import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationProfilesComponent } from './information-profiles.component';

describe('InformationProfilesComponent', () => {
  let component: InformationProfilesComponent;
  let fixture: ComponentFixture<InformationProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
