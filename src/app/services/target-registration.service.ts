import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import {
  IProteinClass,
  ITarget,
  IFastaResponse
} from "../protein-expression.interface";

@Injectable({
  providedIn: "root"
})
export class TargetRegistrationService {
  private proteinClassesUrl = "api/proteinClasses"; // temp URL to mock web api
  private targetUrl = "api/proteinTargets";
  private fastaUrl = "api/fastaFiles";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  /** GET protein classes from backend
   * @returns Observable<IProteinClass[]>
   */
  getProteinClasses(): Observable<IProteinClass[]> {
    const httpOptions = this.getHttpOptions();
    return this.http
      .get<IProteinClass[]>(this.proteinClassesUrl, httpOptions)
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
    const httpOptions = this.getHttpOptions("multipart/form-data");
    const fastaFile = {
      sequence_type: type,
      expected_entry_count: 1,
      fasta_file: file
    };
    console.log(fastaFile);
    return this.http
      .post<IFastaResponse>(this.fastaUrl, fastaFile, httpOptions)
      .pipe(catchError(this.handleError<IFastaResponse>("uploadFastaFile")));
  }

  /** POST register new protein target
   * @params target
   * @returns Observable<ITarget>
   */
  registerTarget(targetData): Observable<ITarget> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<ITarget>(
      this.targetUrl,
      this.formatTarget(targetData),
      httpOptions
    );
  }

  /** POST register subunit interactions */
  registerInteractions() {}

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
        name: unit.name,
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
      project: targetObject.project,
      subunits: formattedUnits
    };
  }

  private getHttpOptions(contentType?: string) {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        "Content-Type": contentType ? contentType : "application/json",
        Authorization: `Token ${token}`
      })
    };
  }
}
