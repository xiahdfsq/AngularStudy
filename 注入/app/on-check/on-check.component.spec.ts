import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCheckComponent } from './on-check.component';

describe('OnCheckComponent', () => {
  let component: OnCheckComponent;
  let fixture: ComponentFixture<OnCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
