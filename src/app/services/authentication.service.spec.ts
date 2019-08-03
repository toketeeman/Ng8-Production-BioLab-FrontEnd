import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { IUser } from "../protein-expression.interface";

describe("AuthenticationService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthenticationService;
  let mockUser: IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthenticationService);

    mockUser = {
      username: "user1",
      password: "password1"
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(authService).toBeTruthy();
  });

  it("should login and return a token value", () => {
    authService
      .logIn(mockUser.username, mockUser.password)
      .subscribe(response => {
        expect(response).toEqual(mockUser);
      });

    const req = httpTestingController.expectOne(authService.authUrl);
    expect(req.request.method).toEqual("POST");
    mockUser.token = "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b";

    req.flush(mockUser);
  });

  it("should handle an error", () => {
    const errMsg = "simulated error message";
    authService.logIn(mockUser.username, mockUser.password).subscribe(
      response => {
        fail("should fail with an error");
      },
      error => {
        expect(error.error).toEqual(errMsg, "message");
      }
    );

    const req = httpTestingController.expectOne(authService.authUrl);
    req.flush(errMsg, { status: 401, statusText: "invalid credentials" });
  });

  it("#getToken should return a token from localStorage", () => {
    const mockToken = "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b";
    localStorage.setItem("token", mockToken);

    expect(authService.getToken()).toEqual(mockToken);
  });
});
