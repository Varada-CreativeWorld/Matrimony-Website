import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileidsearchComponent } from './profileidsearch.component';

describe('ProfileidsearchComponent', () => {
  let component: ProfileidsearchComponent;
  let fixture: ComponentFixture<ProfileidsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileidsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileidsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
