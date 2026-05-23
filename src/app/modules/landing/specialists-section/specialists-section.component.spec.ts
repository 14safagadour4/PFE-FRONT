import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistsSectionComponent } from './specialists-section.component';

describe('SpecialistsSectionComponent', () => {
  let component: SpecialistsSectionComponent;
  let fixture: ComponentFixture<SpecialistsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialistsSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
