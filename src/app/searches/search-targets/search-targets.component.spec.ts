import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchTargetsComponent } from "./search-targets.component";

describe("SearchTargetsComponent", () => {
  let component: SearchTargetsComponent;
  let fixture: ComponentFixture<SearchTargetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTargetsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
