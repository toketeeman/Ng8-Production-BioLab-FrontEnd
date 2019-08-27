import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { MatDividerModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material";
import { SubunitInteractionsComponent } from "./subunit-interactions.component";

describe("SubunitInteractionsComponent", () => {
  let component: SubunitInteractionsComponent;
  let fixture: ComponentFixture<SubunitInteractionsComponent>;
  let store: MockStore<{
    target: any;
    subunits: any[];
  }>;
  const mockInteractions = [
    {
      origin_subunit: 1,
      origin_subunit_copy: 3,
      destination_subunit: 2,
      destination_subunit_copy: 1,
      interaction: "covalent"
    },
    {
      origin_subunit: 2,
      origin_subunit_copy: 2,
      destination_subunit: 1,
      destination_subunit_copy: 2,
      interaction: "covalent"
    }
  ];

  const mockPtms = [
    {
      origin_subunit: 1,
      origin_subunit_residue: 16,
      destination_subunit: 2,
      destination_subunit_residue: 45,
      ptm: "ptm"
    },
    {
      origin_subunit: 2,
      origin_subunit_residue: 13,
      destination_subunit: 1,
      destination_subunit_residue: 74,
      ptm: "another ptm"
    }
  ];

  const initialState = {
    target: {
      target: "targetA",
      partner: "partnerA",
      id: 1234,
      protein_class_pk: 1,
      notes: "",
      project_name: "projectA",
      subunits: [
        {
          subunit_name: "subunit1 name",
          copies: 1,
          amino_acid_fasta_description: "Subunit 1 AA Fasta Description",
          amino_acid_sequence: "ASDTQCGHKR",
          dna_fasta_description: "Subunit 1 DNA Fasta Description",
          dna_sequence: "ATCGGCTAGCTAGCATCGATCGA"
        },
        {
          subunit_name: "subunit2 name",
          copies: 1,
          amino_acid_fasta_description: "Subunit 2 AA Fasta Description",
          amino_acid_sequence: "ASDTQCGHKRDTQCGHKR",
          dna_fasta_description: "Subunit 2 DNA Fasta Description",
          dna_sequence: "CGCTGCGACGAGCTAGGGCGATCGACGATTCAGG"
        }
      ]
    },
    subunits: [
      {
        subunit_name: "subunit1 name",
        copies: 1,
        amino_acid_fasta_description: "Subunit 1 AA Fasta Description",
        amino_acid_sequence: "ASDTQCGHKR",
        dna_fasta_description: "Subunit 1 DNA Fasta Description",
        dna_sequence: "ATCGGCTAGCTAGCATCGATCGA"
      },
      {
        subunit_name: "subunit2 name",
        copies: 1,
        amino_acid_fasta_description: "Subunit 2 AA Fasta Description",
        amino_acid_sequence: "ASDTQCGHKRDTQCGHKR",
        dna_fasta_description: "Subunit 2 DNA Fasta Description",
        dna_sequence: "CGCTGCGACGAGCTAGGGCGATCGACGATTCAGG"
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatTooltipModule
      ],
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

  it("should require at least one subunit interaction to be valid", () => {
    expect(component.interactionForm.valid).toBeFalsy();
    component.subunitsArray.patchValue(mockInteractions);
    component.ptmsArray.patchValue(mockPtms);
    expect(component.interactionForm.valid).toBeTruthy();
  });

  it("should add a subunit interaction or ptm control to the form", () => {
    component.addSubUnitInteraction();
    expect(component.subunitsArray.length).toEqual(2);
    component.addPtm();
    expect(component.subunitsArray.length).toEqual(2);
  });

  it("should delete a subunit interaction control to the form", () => {
    component.deleteInteraction("subunitsArray", 0);
    expect(component.subunitsArray.length).toEqual(0);
    component.deleteInteraction("ptmsArray", 0);
    expect(component.ptmsArray.length).toEqual(0);
  });
});
