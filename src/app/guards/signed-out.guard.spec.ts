import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SignedOutGuard } from "./signed-out.guard";

describe("VerifySignedOutGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedOutGuard],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it("should ...", inject([SignedOutGuard], (guard: SignedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
