import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchPlasmidsComponent } from "./search-plasmids.component";

describe("SearchPlasmidsComponent", () => {
  let component: SearchPlasmidsComponent;
  let fixture: ComponentFixture<SearchPlasmidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPlasmidsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlasmidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
