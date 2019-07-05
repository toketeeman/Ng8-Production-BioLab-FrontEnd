import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NewTargetComponent } from "./new-target.component";
import { ITarget } from "../protein-expression.interface";

describe("NewTargetComponent", () => {
  let component: NewTargetComponent;
  let fixture: ComponentFixture<NewTargetComponent>;

  const mockTarget = {
    target: "targetA",
    partner: "partnerA",
    protein_class_pk: 1,
    notes: "",
    project: "projectA",
    subunits: [
      {
        name: "subunitA",
        copies: 1,
        amino_acid_file: "../../mocks/example_protein.fasta",
        dna_file: "../../mocks/example_dna.fasta"
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [NewTargetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTargetComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be invalid if form is empty", () => {
    expect(component.targetForm.valid).toBeFalsy();
  });

  it("should be valid if form is completed with valid target data", () => {
    component.target.patchValue(mockTarget.target);
    expect(component.target.valid).toBeTruthy();

    component.partner.patchValue(mockTarget.partner);
    expect(component.target.valid).toBeTruthy();

    // @TODO distable this tslint rule for entire project
    // tslint:disable-next-line:no-string-literal
    component.protein_class_pk.patchValue(mockTarget["protein_class_pk"]);
    expect(component.protein_class_pk.valid).toBeTruthy();

    component.project.patchValue(mockTarget.project);
    expect(component.project.valid).toBeTruthy();

    // @TODO Fix test of FASTA file uploads
    // component.subUnits.patchValue(mockTarget.subunits);
    // expect(component.subUnits.valid).toBeTruthy();

    // expect(component.targetForm.valid).toBeTruthy();
  });

  it("should add a new subunit formGroup", () => {
    component.addSubunit();
    expect(component.subunits.length).toEqual(2);
  });

  it("should delete a subunit formGroup", () => {
    component.addSubunit(); // add a subunit first because the minimum number of subunits is 1;
    component.deleteSubunit(1);
    expect(component.subunits.length).toEqual(1);
  });

  // @TODO add test for proteinClass dropdown
});
