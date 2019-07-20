import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { SubunitInteractionsComponent } from "./subunit-interactions.component";

describe("SubunitInteractionsComponent", () => {
  let component: SubunitInteractionsComponent;
  let fixture: ComponentFixture<SubunitInteractionsComponent>;
  let store: MockStore<{
    target: any;
    subunits: any[];
  }>;
  const initialState = { target: null, subunits: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SubunitInteractionsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubunitInteractionsComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store<any>>(Store);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
