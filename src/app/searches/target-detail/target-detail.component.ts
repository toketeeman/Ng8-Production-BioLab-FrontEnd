import { Component, OnInit, isDevMode, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { devUrls, prodUrls } from "../../../environments/environment-urls";
import { ITargetDetail } from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit, AfterViewInit {
  detailData$: Observable<ITargetDetail>;
  currentTargetId: string;
  targetsDetailUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private errorDialogService: ErrorDialogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.currentTargetId = this.route.snapshot.paramMap.get('id');

    if (isDevMode()) {
      this.targetsDetailUrl = devUrls.targetsDetailUrl;
    } else {
      this.targetsDetailUrl = prodUrls.targetsDetailUrl + '?target_id=' + this.currentTargetId;
    }

    // configure grid and carousel stuff here.

    this.detailData$ = this.http.get<ITargetDetail>(this.targetsDetailUrl)
      .pipe(
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(error, ['message']);
          const noResult: ITargetDetail = null;
          return of(noResult);
        })
      );
  }

  ngAfterViewInit(): void {
    
  }
}
