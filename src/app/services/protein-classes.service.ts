import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  private proteinClasses: IProteinClass[] = [];  // Repository of available protein classes.

  constructor(
    private errorDialogService: ErrorDialogService,
    private http: HttpClient,
    private router: Router
  ) {
    this.proteinClassesUrl = environment.urls.proteinClassesUrl;
  }

  initProteinClasses(): void {
    this.http.get<IProteinClass[]>(this.proteinClassesUrl)
      .pipe(
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForMessages('System Error: You may log in but protein classes will not be available. Contact admin.');
          const noResults: IProteinClass[] = [];
          return of(noResults);
        })
      )
      .subscribe(
        proteinClasses => {
          if (!proteinClasses.length) {
            this.router.navigateByUrl("/login");
          }
          this.proteinClasses = proteinClasses;
        }
      );
  }

  getProteinClasses(): Observable<IProteinClass[]> {
    return of(this.proteinClasses);
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
