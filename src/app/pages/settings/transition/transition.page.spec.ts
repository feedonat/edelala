import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransitionPage } from './transition.page';

describe('TransitionPage', () => {
  let component: TransitionPage;
  let fixture: ComponentFixture<TransitionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
