import { Injectable, isDevMode } from "@angular/core";
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
import { devUrls, prodUrls } from "../../environments/environment-urls";

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
    private authService: AuthenticationService
  ) {
    if (isDevMode()) {
      this.proteinClassesUrl = devUrls.proteinClassesUrl;
      this.targetUrl = devUrls.targetUrl;
      this.fastaUrl = devUrls.fastaUrl;
      this.interactionsUrl = devUrls.interactionsUrl;
      this.ptmsUrl = devUrls.ptmsUrl;
    } else {
      this.proteinClassesUrl = prodUrls.proteinClassesUrl;
      this.targetUrl = prodUrls.targetUrl;
      this.fastaUrl = prodUrls.fastaUrl;
      this.interactionsUrl = prodUrls.interactionsUrl;
      this.ptmsUrl = prodUrls.ptmsUrl;
    }
  }

  /** GET protein classes from backend
   * @returns Observable<IProteinClass[]>
   */
  getProteinClasses(): Observable<IProteinClass[]> {
    return this.http
      .get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(catchError(this.handleError<IProteinClass[]>("getProteinClasses")));
  }

  /** POST upload individual FASTA file
   * @params  type: "amino_acid" | "dna", file
   * @returns Observable<IFastaResponse>
   */

  uploadFastaFile(
    type: "amino_acid" | "dna",
    file: any
  ): Observable<IFastaResponse> {
    const formData = new FormData();
    const fastaFile = {
      sequence_type: type,
      expected_entry_count: 1,
      fasta_file: file
    };

    for (const [key, value] of Object.entries(fastaFile)) {
      formData.append(key, value);
    }
    return this.http.post<IFastaResponse>(this.fastaUrl, formData);
  }

  /** POST register new protein target
   * @params target
   * @returns Observable<ITarget>
   */
  registerTarget(targetData): Observable<ITarget> {
    return this.http.post<ITarget>(
      this.targetUrl,
      this.formatTarget(targetData)
    );
  }

  /** POST register subunit interactions
   * @params subunitInteractions: ISubunitInteraction[]
   * @returns Observable<any>
   */
  registerInteractions(
    subunitInteractions: ISubunitInteraction[]
  ): Observable<any> {
    return this.http.post<any>(
      this.interactionsUrl,
      subunitInteractions
    );
  }

  /** POST register post translational modifications
   * @params ptms: IPostTranslationalModification[]
   * @returns Observable<any>
   */

  registerPtms(ptms: IPostTranslationalModification[]): Observable<any> {
    return this.http.post<any>(this.ptmsUrl, ptms);
  }

  /**
   * Handle failed http operation
   * @param operation - name of failed http operation
   */
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
