import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TargetRegistrationService } from "./target-registration.service";

describe("TargetRegistrationService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  });

});

  it("should be created", () => {
    const service: TargetRegistrationService = TestBed.get(
      TargetRegistrationService
    );
    expect(service).toBeTruthy();
  });
});
