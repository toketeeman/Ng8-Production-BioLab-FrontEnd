import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { CanAccessGuard } from "./can-access.guard";

describe("CanAccessGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAccessGuard],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it("should ...", inject([CanAccessGuard], (guard: CanAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
