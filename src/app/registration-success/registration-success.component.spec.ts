import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { MatExpansionModule } from "@angular/material";
import { RegistrationSuccessComponent } from "./registration-success.component";

describe("RegistrationSuccessComponent", () => {
  let component: RegistrationSuccessComponent;
  let fixture: ComponentFixture<RegistrationSuccessComponent>;
  let store: MockStore<{
    target: any;
    subunits: any[];
  }>;
  const initialState = { target: null, subunits: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatExpansionModule],
      declarations: [RegistrationSuccessComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSuccessComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store<any>>(Store);
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
