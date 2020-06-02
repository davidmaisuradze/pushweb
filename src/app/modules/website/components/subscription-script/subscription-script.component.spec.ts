import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionScriptComponent } from './subscription-script.component';

describe('SubscriptionScriptComponent', () => {
  let component: SubscriptionScriptComponent;
  let fixture: ComponentFixture<SubscriptionScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionScriptComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
