import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { LoginFormComponent } from "./login-form.component";

describe("LoginFormComponent", () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: MockStore<{ errorMessage: string }>;
  const initialState = { errorMessage: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [LoginFormComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
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

  it("should require a username and password", () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.patchValue({
      username: "user",
      password: "password123"
    });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
