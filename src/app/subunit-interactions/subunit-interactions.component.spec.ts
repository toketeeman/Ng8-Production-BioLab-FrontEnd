import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubunitInteractionsComponent } from './subunit-interactions.component';

describe('SubunitInteractionsComponent', () => {
  let component: SubunitInteractionsComponent;
  let fixture: ComponentFixture<SubunitInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubunitInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubunitInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
