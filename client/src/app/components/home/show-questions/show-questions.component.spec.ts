import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionsComponent } from './show-questions.component';

describe('ShowQuestionsComponent', () => {
  let component: ShowQuestionsComponent;
  let fixture: ComponentFixture<ShowQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
