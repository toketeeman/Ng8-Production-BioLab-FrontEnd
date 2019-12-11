import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import {
  IProteinClass,
  ITarget,
  IFastaResponse,
  ISubunitInteraction,
  IPostTranslationalModification
} from "../protein-expression.interface";
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TargetRegistrationService {
  proteinClassesUrl: string;
  targetUrl: string;
  fastaUrl: string;
  interactionsUrl: string;
  ptmsUrl: string;

  constructor(
    private http: HttpClient,
    private errorDialogService: ErrorDialogService
  ) {
      this.proteinClassesUrl = environment.urls.proteinClassesUrl;
      this.targetUrl = environment.urls.targetUrl;
      this.fastaUrl = environment.urls.fastaUrl;
      this.interactionsUrl = environment.urls.interactionsUrl;
      this.ptmsUrl = environment.urls.ptmsUrl;
  }

  retrieveProteinClasses(): Observable<IProteinClass[]> {
    return this.http.get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(
        catchError(error => {
          this.errorDialogService.openDialogForMessages('Protein class selection is not be available. Contact admin.');
          const noClasses: IProteinClass[] = [];
          return of(noClasses);
        })
      );
  }

  uploadFastaFile(
    type: "amino_acid" | "dna",
    file: any
  ): Observable<IFastaResponse> {
    const formData = new FormData();
    const fastaFile = {
      sequence_type: type,        // Requesting type validation here.
      expected_entry_count: 1,    // Requesting number-of-records validation here.
      fasta_file: file
    };

    for ( const [key, value] of Object.entries(fastaFile) ) {
      formData.append(key, value);
    }
    return this.http.post<IFastaResponse>(this.fastaUrl, formData);
  }

  registerTarget(targetData: ITarget): Observable<any> {
    return this.http.post<any>(
      this.targetUrl,
      this.formatTargetRegistration(targetData)
    );
  }

  registerInteractions(
    subunitInteractions: ISubunitInteraction[]
  ): Observable<any> {
    return this.http.post<any>(
      this.interactionsUrl,
      subunitInteractions
    );
  }

  registerPtms(ptms: IPostTranslationalModification[]): Observable<any> {
    return this.http.post<any>(
      this.ptmsUrl,
      ptms);
  }

  // Moving from UI format to back-end format.
  private formatTargetRegistration(targetObject: ITarget): any {
    const formattedUnits = targetObject.subunits.map(unit => {
      return {
        subunit_name: unit.subunit_name,
        copies: unit.copies,
        amino_acid_fasta_description: unit.amino_acid_fasta_description,
        amino_acid_sequence: unit.amino_acid_sequence,
        dna_fasta_description: unit.dna_fasta_description,
        dna_sequence: unit.dna_sequence
      };
    });
    return {
      // Note that the backend expects different keys for target and project values!
      target: targetObject.target_name,
      partner: targetObject.partner,
      protein_class_pk: targetObject.protein_class_pk,
      notes: targetObject.notes,
      project: targetObject.project_name,
      subunits: formattedUnits
    };
  }

}
