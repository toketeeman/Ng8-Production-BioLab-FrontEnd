import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap, map, take } from 'rxjs/operators';

import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { NguCarouselConfig } from '@ngu/carousel';

import {
  ITargetDetail,
  ISubunit,
  ISubunitInteraction,
  ITargetDetailHeader,
  IPostTranslationalModification
} from "../../protein-expression.interface";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("targetHeaderGrid", { static: false }) targetHeaderGrid: AgGridAngular;
  @ViewChild("subunitInteractionsGrid", { static: false }) subunitInteractionsGrid: AgGridAngular;
  @ViewChild("ptmsGrid", { static: false }) ptmsGrid: AgGridAngular;

  public modules: Module[] = AllModules;
  public domLayout;
  detailData$: Observable<ITargetDetail>;
  targetHeaderData: ITargetDetailHeader[];
  subunitInteractionsData: ISubunitInteraction[];
  ptmsData: IPostTranslationalModification[];
  targetHeaderColumnDefs;
  subunitInteractionsColumnDefs;
  ptmsColumnDefs;
  subunits: ISubunit[] = [];
  currentTargetId: string;
  targetsDetailUrl: string;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
    slide: 1,
    speed: 400,
    point: {
      visible: true,
      hideOnSingleSlide: true
    },
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  subunitsAreHovered = false;

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

    this.domLayout = 'autoHeight';

    // Configure target header grid.
    this.targetHeaderColumnDefs = [
      {
        headerName: "Target Name",
        field: "target_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Partner",
        field: "partner",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: [],
      },
      {
        headerName: "Protein Class",
        field: "class",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Project Name",
        field: "project_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Notes",
        field: "notes",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      }
    ];

    // Configure sub unit interactions grid.
    this.subunitInteractionsColumnDefs = [
      {
        headerName: "Sub Unit Name",
        field: "subunit_one_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '24%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Copy #",
        field: "subunit_one_copy",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Interaction Type",
        field: "interaction",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Sub Unit Name",
        field: "subunit_two_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '24%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Copy #",
        field: "subunit_two_copy",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      }
    ];

    // Configure post translation modifications grid.
    this.ptmsColumnDefs = [
      {
        headerName: "Sub Unit Name",
        field: "subunit_one_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '22%'
        }
      },
      {
        headerName: "Residue Number",
        field: "subunit_one_residue",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Sub Unit Name",
        field: "subunit_two_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '22%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Residue Number",
        field: "subunit_two_residue",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Post Translational Modification",
        field: "ptm",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '22%'
        },
        sortable: false,
        menuTabs: []
      }
    ];

    this.detailData$ = this.http.get<ITargetDetail>(this.targetsDetailUrl)
      .pipe(
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(error, ['message']);
          const noResult: ITargetDetail = null;
          return of(noResult);
        })
      );

    this.detailData$
      .pipe(
        take(1),
        map((targetDetail: ITargetDetail) => targetDetail.target)
      ).subscribe(targetDetailHeader => {
        this.targetHeaderData = [
          {
            target_name: targetDetailHeader.target_name,
            partner: targetDetailHeader.partner,
            class: targetDetailHeader.class,
            project_name: targetDetailHeader.project_name,
            notes: targetDetailHeader.notes
          }
        ];
        this.subunits = targetDetailHeader.subunits;
      });

    this.detailData$
      .pipe(
        take(1),
        map((targetDetail: ITargetDetail) => targetDetail.interactions)
      ).subscribe(subunitInteractions => {
        this.subunitInteractionsData = subunitInteractions;
      });

    this.detailData$
      .pipe(
        take(1),
        map((targetDetail: ITargetDetail) => targetDetail.ptms)
      ).subscribe(ptms => {
        this.ptmsData = ptms;
      });
  }

  enterSubunits(): void {
    this.subunitsAreHovered = true;
  }

  leaveSubunits(): void {
    this.subunitsAreHovered = false;
  }

  ngAfterViewInit() {
    // Responsive window behavior.
    this.targetHeaderGrid.api.sizeColumnsToFit();
    this.subunitInteractionsGrid.api.sizeColumnsToFit();
    this.ptmsGrid.api.sizeColumnsToFit();
    window.onresize = () => {
      this.targetHeaderGrid.api.sizeColumnsToFit();
      this.subunitInteractionsGrid.api.sizeColumnsToFit();
      this.ptmsGrid.api.sizeColumnsToFit();
    };
  }
}
