import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddSubunitComponent } from "./add-subunit.component";

describe("AddSubunitComponent", () => {
  let component: AddSubunitComponent;
  let fixture: ComponentFixture<AddSubunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubunitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
