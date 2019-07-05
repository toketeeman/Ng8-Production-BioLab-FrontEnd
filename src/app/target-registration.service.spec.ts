import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TargetRegistrationService } from "./target-registration.service";

describe("TargetRegistrationService", () => {
  const mockProteinClasses = [
    {
      protein_class_name: "protein class1 name",
      protein_class_pk_id: 1
    },
    {
      protein_class_name: "protein class2 name",
      protein_class_pk_id: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetRegistrationService],
      imports: [HttpClientTestingModule]
    });
  });

  it("should be created", () => {
    const service: TargetRegistrationService = TestBed.get(
      TargetRegistrationService
    );
    expect(service).toBeTruthy();
  });

  it("expects service to get a list of protein classes", inject(
    [HttpTestingController, TargetRegistrationService],
    (httpMock: HttpTestingController, service: TargetRegistrationService) => {
      service.getProteinClasses().subscribe(data => {
        // @TODO fix these assertions when real API endpoint is finished
        // expect(data).toEqual(mockProteinClasses);
      });

      const req = httpMock.expectOne("api/proteinClasses");
      expect(req.request.method).toEqual("GET");
      req.flush({
        data: mockProteinClasses
      });
    }
  ));

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));
  // it should POST new target object

  // it should POST subunit interactions object

  // it should handle an http error
});
