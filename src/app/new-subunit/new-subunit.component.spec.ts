import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubunitComponent } from './new-subunit.component';

describe('NewSubunitComponent', () => {
  let component: NewSubunitComponent;
  let fixture: ComponentFixture<NewSubunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
