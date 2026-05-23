import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdChatbotComponent } from './bird-chatbot.component';

describe('BirdChatbotComponent', () => {
  let component: BirdChatbotComponent;
  let fixture: ComponentFixture<BirdChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BirdChatbotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BirdChatbotComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
