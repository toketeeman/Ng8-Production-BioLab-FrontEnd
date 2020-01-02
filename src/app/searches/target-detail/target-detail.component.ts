import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { catchError, map, take, takeUntil } from 'rxjs/operators';

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
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../../environments/environment";

@Component({
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("targetHeaderGrid", { static: false }) targetHeaderGrid: AgGridAngular;
  @ViewChild("subunitInteractionsGrid", { static: false }) subunitInteractionsGrid: AgGridAngular;
  @ViewChild("ptmsGrid", { static: false }) ptmsGrid: AgGridAngular;

  private destroyed$ = new Subject();
  public modules: Module[] = AllModules;
  public domLayout;
  detailData$: Observable<ITargetDetail>;
  targetHeaderData: ITargetDetailHeader[];          // UI-bound data.
  subunitInteractionsData: ISubunitInteraction[];   // UI-bound data.
  ptmsData: IPostTranslationalModification[];       // UI-bound data.
  defaultColDef;
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
    private errorDialogService: ErrorDialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentTargetId = this.route.snapshot.paramMap.get('id');

    if (environment.inMemoryData) {
      this.targetsDetailUrl = environment.urls.targetsDetailUrl;
    } else {
      this.targetsDetailUrl = environment.urls.targetsDetailUrl + '?target_id=' + this.currentTargetId;
    }

    this.domLayout = 'autoHeight';

    // Shared by all grids.
    this.defaultColDef = {
      resizable: true
    };

    // Configure target header grid.
    this.targetHeaderColumnDefs = [
      {
        headerName: "Target Name",
        headerClass: "target-detail-header",
        field: "target_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Partner",
        headerClass: "target-detail-header",
        field: "partner",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: [],
      },
      {
        headerName: "Protein Class",
        headerClass: "target-detail-header",
        field: "protein_class_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Project Name",
        headerClass: "target-detail-header",
        field: "project_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Notes",
        headerClass: "target-detail-header",
        field: "notes",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
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
        headerClass: "target-detail-header",
        field: "subunit_one_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '24%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Copy #",
        headerClass: "target-detail-header",
        field: "subunit_one_copy",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Interaction Type",
        headerClass: "target-detail-header",
        field: "interaction",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Sub Unit Name",
        headerClass: "target-detail-header",
        field: "subunit_two_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '24%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Copy #",
        headerClass: "target-detail-header",
        field: "subunit_two_copy",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
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
        headerClass: "target-detail-header",
        field: "subunit_one_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '22%'
        }
      },
      {
        headerName: "Residue Number",
        headerClass: "target-detail-header",
        field: "subunit_one_residue",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Sub Unit Name",
        headerClass: "target-detail-header",
        field: "subunit_two_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '22%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Residue Number",
        headerClass: "target-detail-header",
        field: "subunit_two_residue",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '14%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "PTM",
        headerClass: "target-detail-header",
        field: "ptm",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
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
          this.errorDialogService.openDialogForErrorResponse(
            error,
            ['message'],
            "Details for this target could not be found."
          );
          const noResult: ITargetDetail = null;
          return of(noResult);
        })
      );

    this.detailData$
      .pipe(
        map((targetDetail: ITargetDetail) => targetDetail.target),
        take(1),
        takeUntil(this.destroyed$)
      ).subscribe(targetDetailHeader => {
        this.targetHeaderData = [
          {
            target_name: targetDetailHeader.target_name,
            partner: targetDetailHeader.partner,
            protein_class_name: targetDetailHeader.protein_class_name,
            project_name: targetDetailHeader.project_name,
            notes: targetDetailHeader.notes
          },
          {
            target_name: null,      // Dirty fix to prevent resizing flicking by grid.
            partner: null,
            protein_class_name: null,
            project_name: null,
            notes: null
          },
        ];
        this.subunits = targetDetailHeader.subunits;
      });

    this.detailData$
      .pipe(
        map((targetDetail: ITargetDetail) => targetDetail.interactions),
        take(1),
        takeUntil(this.destroyed$)
      ).subscribe(subunitInteractions => {
        subunitInteractions.push({    // Dirty fix to prevent resizing flicking by grid.
          subunit_one_name: null,
          subunit_one_copy: null,
          subunit_two_name: null,
          subunit_two_copy: null,
          interaction: null
        });
        this.subunitInteractionsData = subunitInteractions;
      });

    this.detailData$
      .pipe(
        map((targetDetail: ITargetDetail) => targetDetail.ptms),
        take(1),
        takeUntil(this.destroyed$)
      ).subscribe(ptms => {
        ptms.push({                   // Dirty fix to prevent resizing flicking by grid.
          subunit_one_name: null,
          subunit_one_residue: null,
          subunit_two_name: null,
          subunit_two_residue: null,
          ptm: null
        });
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

    let timeout;
    window.onresize = () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(
        () => {
          this.targetHeaderGrid.api.sizeColumnsToFit();
          this.subunitInteractionsGrid.api.sizeColumnsToFit();
          this.ptmsGrid.api.sizeColumnsToFit();
        }
      );
    };
  }

  // Clean up the subscriptions.
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // Go back to the current target search.
  onBackToSearch() {
    this.router.navigateByUrl("/home/search-targets");
  }

  // Go inspect the biophysical properties.
  onBiophysicalProperties() {
    this.router.navigateByUrl("/home/target-property/" + this.currentTargetId);
  }
}
