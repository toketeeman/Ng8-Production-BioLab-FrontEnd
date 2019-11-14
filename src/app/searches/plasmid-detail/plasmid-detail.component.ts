import { Component, OnInit, isDevMode, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

import { devUrls, prodUrls } from "../../../environments/environment-urls";
import {  IGridPlasmid , IGridPlasmidDetail, IGridFeatureQualifier } from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { FeatureQualifierRenderer } from './feature-qualifier-renderer.component';


@Component({
  templateUrl: './plasmid-detail.component.html',
  styleUrls: ['./plasmid-detail.component.scss']
})
export class PlasmidDetailComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  public modules: Module[] = AllModules;
  rowData$: Observable<IGridPlasmidDetail[]>;
  rowSelection = "multiple";
  currentPlasmidId: string;
  plasmidsDetailUrl: string;
  columnDefs;
  statusBar;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private errorDialogService: ErrorDialogService,
    private route: ActivatedRoute) {}


  ngOnInit() {
    this.currentPlasmidId = this.route.snapshot.paramMap.get('id');

    if (isDevMode()) {
      this.plasmidsDetailUrl = devUrls.plasmidsDetailUrl;
    } else {
      this.plasmidsDetailUrl = prodUrls.plasmidsDetailUrl + '?plasmid_id=' + this.currentPlasmidId;
    }

    this.columnDefs = [
      {
        headerName: "Feature Name",
        field: "name",
        autoHeight: true,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '20%' },
        sortable: true,
        filter: true
      },
      {
        headerName: "Feature Type",
        field: "feature_type",
        autoHeight: true,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '10%' },
        sortable: true,
        filter: true
      },
      {
        headerName: "Position",
        field: "sequence_span",
        autoHeight: true,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '8%' },
        sortable: true,
        filter: true
      },
      {
        headerName: "Strand",
        field: "strand",
        autoHeight: true,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '7%' },
        sortable: true,
        filter: true
      },
      {
        headerName: "Sequence",
        field: "dna_sequence",
        autoHeight: true,
        width: 400,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '25%' },
        sortable: true,
        filter: true
      },
      {
        headerName: "Feature Qualifier",
        field: "feature_qualifier",
        autoHeight: true,
        width: 400,
        cellStyle: { 'white-space': 'normal', 'overflow-wrap': 'break-word', width: '25%'  },
        cellRendererFramework: FeatureQualifierRenderer
      }
    ];

    this.statusBar = {
      statusPanels: [
        {
          statusPanel: "agTotalAndFilteredRowCountComponent",
          align: "left"
        },
        {
          statusPanel: "agTotalRowCountComponent",
          align: "left"
        }
      ]
    };

    this.rowData$ = this.http.get<IGridPlasmidDetail[]>(this.plasmidsDetailUrl)
                      .pipe(
                        catchError(error => {
                          console.log(JSON.stringify(error));
                          this.errorDialogService.openDialogForErrorResponse(error, ['message']);
                          const noResults: IGridPlasmidDetail[] = [];
                          return of(noResults);
                        })
                      );
  }

  ngAfterViewInit() {
    // Grid options can finally be set at this point.
    this.agGrid.gridOptions.animateRows = true;

    this.agGrid.gridOptions.defaultColDef = {
      filter: true
    };

    this.agGrid.gridOptions.rowBuffer = 20;   // Default is 10.

    // Responsive window behavior.
    this.agGrid.api.sizeColumnsToFit();
    window.onresize = () => {
      this.agGrid.api.sizeColumnsToFit();
    };
  }

  onBack() {
    this.router.navigateByUrl('/home/search-plasmids');
  }

  convertFeatureQualifiersToExport( params: any ): string {
    if (params.column.colDef.field === 'feature_qualifier' && params.value ) {
      const qualifiers = params.value;
      if (qualifiers instanceof Array && qualifiers.length > 0) {
        let convertedQualifiers = "";
        qualifiers.forEach( (qualifier) => {
          convertedQualifiers = convertedQualifiers.concat(qualifier.type + ": " + qualifier.value + "  ");
        });
        return convertedQualifiers;
      }
    } else {
      return params.value;
    }
  }

  onExcelExport() {
    console.log("Excel Export!");

    const exportParams = {
      filename: this.currentPlasmidId,
      onlySelected: true,
      processCellCallback: (params: any) => {
        return this.convertFeatureQualifiersToExport(params);
      }
    };

    this.agGrid.api.forEachNode( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });
    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowNode.setSelected(true, false);
    });

    this.agGrid.api.exportDataAsExcel(exportParams);

    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });
  }
}
