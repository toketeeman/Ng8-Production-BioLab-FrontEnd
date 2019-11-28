import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';

import { ITargetDetail, ISubunit} from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit, AfterViewInit, AfterContentInit {
  detailData$: Observable<ITargetDetail>;
  subunits$: Observable<ISubunit[]>;
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

    if (environment.inMemoryData) {
      this.targetsDetailUrl = environment.urls.targetsDetailUrl;
    } else {
      this.targetsDetailUrl = environment.urls.targetsDetailUrl + '?target_id=' + this.currentTargetId;
    }

    // Configure grid and carousel stuff here.

    this.detailData$ = this.http.get<ITargetDetail>(this.targetsDetailUrl)
      .pipe(
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(error, ['message']);
          const noResult: ITargetDetail = null;
          return of(noResult);
        })
      );
    this.subunits$ = this.detailData$
      .pipe(
        map((targetDetail: ITargetDetail) => targetDetail.target.subunits)
      );
  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {

  }
}
