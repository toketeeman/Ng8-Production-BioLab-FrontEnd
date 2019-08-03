import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TargetRegistrationService } from "./target-registration.service";
import { IFastaResponse, ITarget } from "../protein-expression.interface";

describe("TargetRegistrationService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let targetService: TargetRegistrationService;

  const mockProteinClasses = [
    {
      protein_class_name: "protein class1 name",
      protein_class_pk: 1
    },
    {
      protein_class_name: "protein class2 name",
      protein_class_pk: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetRegistrationService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    targetService = TestBed.get(TargetRegistrationService);
  });

  it("should be created", () => {
    const service: TargetRegistrationService = TestBed.get(
      TargetRegistrationService
    );
    expect(service).toBeTruthy();
  });

  it("should get a list of protein classes", () => {
    targetService.getProteinClasses().subscribe(data => {
      expect(data).toEqual(mockProteinClasses);
    });

    const req = httpTestingController.expectOne(
      targetService.proteinClassesUrl
    );
    expect(req.request.method).toEqual("GET");
    req.flush(mockProteinClasses);
  });

  it("should upload and validate a FASTA file", () => {
    const type = "amino_acid";
    const mockFile = "amino_acid fasta file";

    const mockFastaResponse: IFastaResponse = {
      sequence_type: type,
      expected_entry_count: 1,
      actual_entry_count: 1,
      fasta_entries: [
        {
          fasta_description: "Example Fasta Header String",
          sequence_type: type,
          sequence: "ATCGGCTAGCTAGCATCGATCGA"
        }
      ]
    };
    targetService.uploadFastaFile(type, mockFile).subscribe(data => {
      expect(data).toEqual(mockFastaResponse);
    });

    const req = httpTestingController.expectOne(targetService.fastaUrl);
    expect(req.request.method).toEqual("POST");
    req.flush(mockFastaResponse);
  });

  it("should register new target object", () => {
    const mockTarget: ITarget = {
      target: "targetA",
      partner: "partnerA",
      protein_class_pk: 1,
      notes: "this is a note about targetA",
      project_name: "projectA",
      subunits: [
        {
          subunit_name: "subunitA",
          copies: 1,
          amino_acid_fasta_description: "aa_description_string",
          amino_acid_sequence: "aa_sequence_string",
          dna_fasta_description: "dna_description_string",
          dna_sequence: "dna_sequence_string"
        }
      ]
    };

    targetService.registerTarget(mockTarget).subscribe(data => {
      expect(data).toEqual(mockTarget);
    });

    const req = httpTestingController.expectOne(targetService.targetUrl);
    expect(req.request.method).toEqual("POST");

    req.flush(mockTarget);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // @TODO it should register subunit interactions (POST)
});
