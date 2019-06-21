import { TestBed } from "@angular/core/testing";

import { TargetRegistrationService } from "./target-registration.service";

describe("TargetRegistrationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TargetRegistrationService = TestBed.get(
      TargetRegistrationService
    );
    expect(service).toBeTruthy();
  });
});
