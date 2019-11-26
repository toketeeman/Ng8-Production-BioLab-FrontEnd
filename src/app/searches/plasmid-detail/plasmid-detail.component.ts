import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

import { IGridPlasmidDetail } from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module, ExcelData, ExcelCell, ExcelExportParams } from "@ag-grid-enterprise/all-modules";
import { AuthenticationService } from "../../services/authentication.service";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { FeatureQualifierRenderer } from './feature-qualifier-renderer.component';
import { environment } from "../../../environments/environment";


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
  showBackButton: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
    private errorDialogService: ErrorDialogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    if ((document.referrer as string).toLowerCase().includes("slims")) {
      this.showBackButton = false;
    } else {
       this.showBackButton = true;
    }

    this.currentPlasmidId = this.route.snapshot.paramMap.get('id');

    if (environment.inMemoryData) {
      this.plasmidsDetailUrl = environment.urls.plasmidsDetailUrl;
    } else {
      this.plasmidsDetailUrl = environment.urls.plasmidsDetailUrl + '?plasmid_id=' + this.currentPlasmidId;
    }

    this.columnDefs = [
      {
        headerName: this.currentPlasmidId,
        children:
          [
            {
              headerName: "Feature Name",
              field: "name",
              autoHeight: true,
              cellStyle: {
                'white-space': 'normal',
                'overflow-wrap': 'break-word',
                width: '20%'
              },
              sortable: true,
              filter: true,
              cellClass: "text-is-wrapped"
            },
            {
              headerName: "Feature Type",
              field: "feature_type",
              autoHeight: true,
              cellStyle: { 'white-space': 'normal',
                'overflow-wrap': 'break-word',
                width: '10%'
              },
              sortable: true,
              filter: true,
              cellClass: "text-is-wrapped"
            },
            {
              headerName: "Position",
              field: "sequence_span",
              autoHeight: true,
              cellStyle: { 'white-space': 'normal',
                'overflow-wrap': 'break-word',
                width: '8%'
              },
              sortable: true,
              filter: true,
              cellClass: "text-is-wrapped"
            },
            {
              headerName: "Strand",
              field: "strand",
              autoHeight: true,
              cellStyle: { 'white-space': 'normal',
                'overflow-wrap': 'break-word',
                width: '7%'
              },
              sortable: true,
              filter: true,
              cellClass: "text-is-wrapped"
            },
            {
              headerName: "Sequence",
              field: "dna_sequence",
              autoHeight: true,
              width: 400,
              cellStyle: {
                'white-space': 'normal',
                'overflow-wrap': 'break-word',
                'font-weight': 'bold',
                'font-size': '8pt',
                width: '25%'
              },
              sortable: true,
              filter: true,
              cellClass: ["text-is-wrapped", "dna-sequence-font"]
            },
            {
              headerName: "Feature Qualifier",
              field: "feature_qualifier",
              autoHeight: true,
              width: 400,
              cellStyle: { 'white-space': 'normal',
                'overflow-wrap': 'break-word',
                width: '25%'
              },
              cellRendererFramework: FeatureQualifierRenderer,
              cellClass: "text-is-wrapped"
            }
          ]
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

    this.agGrid.gridOptions.rowBuffer = 20;   // Default is 10. Being generous.

    this.agGrid.gridOptions.excelStyles = [
      {
        id: "header",   // This specific id is required here for the headers.
        font: {
          bold: true,
          size: 20
        }
      },
      {
        id: "text-is-wrapped",
        alignment: {
          wrapText: true,
          vertical: "Top",
          horizontal: "Left"
        }
      },
      {
        id: "dna-sequence-font",
        font: {
          bold: true,
          size: 10
        }
      },
      {
        id: "plasmid-detail-title",
        font: {
          bold: true,
          size: 30
        }
      }
    ];

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
          convertedQualifiers = convertedQualifiers.concat(qualifier.type + ": " + qualifier.value + "\n");
        });
        return convertedQualifiers;
      }
    } else {
      return params.value;
    }
  }

  onExcelExport() {
    const exportParams: any = {
      fileName: this.currentPlasmidId,
      onlySelected: true,
      processCellCallback: (params: any) => {
        return this.convertFeatureQualifiersToExport(params);
      },
      customHeader: [
                      [],
                      [{
                        styleId: 'plasmid-detail-title',
                        data: {
                          type: 'String',
                          value: this.currentPlasmidId
                        },
                        mergeAcross: 6
                      }],
                      []
                    ]
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
