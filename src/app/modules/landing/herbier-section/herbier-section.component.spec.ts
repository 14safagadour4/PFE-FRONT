import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbierSectionComponent } from './herbier-section.component';

describe('HerbierSectionComponent', () => {
  let component: HerbierSectionComponent;
  let fixture: ComponentFixture<HerbierSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerbierSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HerbierSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
