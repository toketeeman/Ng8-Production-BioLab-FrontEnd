import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthenticationService } from "./authentication.service";
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
    private authService: AuthenticationService,
    private errorDialogService: ErrorDialogService
  ) {
      this.proteinClassesUrl = environment.urls.proteinClassesUrl;
      this.targetUrl = environment.urls.targetUrl;
      this.fastaUrl = environment.urls.fastaUrl;
      this.interactionsUrl = environment.urls.interactionsUrl;
      this.ptmsUrl = environment.urls.ptmsUrl;
  }

  // getProteinClasses(): Observable<IProteinClass[]> {
  //   return this.http
  //     .get<IProteinClass[]>(this.proteinClassesUrl)
  //     .pipe(catchError(this.handleError<IProteinClass[]>("getProteinClasses")));
  // }
  getProteinClasses(): Observable<IProteinClass[]> {
    return this.http
      .get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(
        catchError(error => {
          console.log(JSON.stringify(error));
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

    for (const [key, value] of Object.entries(fastaFile)) {
      formData.append(key, value);
    }
    return this.http.post<IFastaResponse>(this.fastaUrl, formData);
  }

  registerTarget(targetData): Observable<ITarget> {
    return this.http.post<ITarget>(
      this.targetUrl,
      this.formatTarget(targetData)
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
    return this.http.post<any>(this.ptmsUrl, ptms);
  }

  private handleError<T>(operation: string) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return;
    };
  }

  private formatTarget(targetObject: any) {
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
      target: targetObject.target,
      partner: targetObject.partner,
      protein_class_pk: targetObject.protein_class_pk,
      notes: targetObject.notes,
      project_name: targetObject.project,
      subunits: formattedUnits
    };
  }

}
