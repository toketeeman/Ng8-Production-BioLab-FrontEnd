import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { IProteinClass } from '../protein-expression.interface';
import { environment } from "../../environments/environment";
import { ErrorDialogService } from "../dialogs/error-dialog/error-dialog.service";

@Injectable({
  providedIn: 'root'
})
export class ProteinClassesService {
  proteinClassesUrl: string;
  private proteinClassesSubject = new BehaviorSubject<IProteinClass[]>([]);
  proteinClasses$ = this.proteinClassesSubject.asObservable();
  proteinClasses: IProteinClass[] = [];

  constructor(
    private errorDialogService: ErrorDialogService,
    private http: HttpClient,
    private router: Router
  ) {
    this.proteinClassesUrl = environment.urls.proteinClassesUrl;
  }

  // Retrieve the protein classes lookup table from backend if necessary.
  // Otherwise used the passed classes. Then initialize the observable
  // with these classes for general accessibility.
  initProteinClasses(proteinClasses?: IProteinClass[]): void {
    if (proteinClasses !== undefined && proteinClasses !== null) {
      this.proteinClassesSubject.next(proteinClasses);
    } else {
      this.http.get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(
        tap((classes: IProteinClass[]) => {
          this.proteinClassesSubject.next(classes);
          this.proteinClasses = classes;
        }),
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForMessages('Protein class selection is not be available. Contact admin.');
          const noClasses: IProteinClass[] = [];
          return of(noClasses);
        })
      )
      .subscribe(
        classes => {
          if (!classes.length) {
            this.router.navigateByUrl("/login");
          }
        }
      );
    }
  }

  getProteinClasses(): Observable<IProteinClass[]> {
    return this.proteinClasses$;
  }

  proteinClassNameToPk(name: string): number {
    return this.proteinClasses
      .find((proteinClass: IProteinClass) => proteinClass.protein_class_name === name).protein_class_pk;
  }

  pkToProteinClassName(pk: number): string {
    return this.proteinClasses
      .find((proteinClass: IProteinClass) => proteinClass.protein_class_pk === pk).protein_class_name;
  }
}
