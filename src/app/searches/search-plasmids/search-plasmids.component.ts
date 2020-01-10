import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material';

import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { FileSaverService } from "ngx-filesaver";

import { IGridPlasmid } from "../../protein-expression.interface";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../../environments/environment";
import { AlertService } from "../../services/alert.service";

@Component({
  templateUrl: "./search-plasmids.component.html",
  styleUrls: ["./search-plasmids.component.scss"]
})
export class SearchPlasmidsComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  public modules: Module[] = AllModules;
  searchSet: string[] = [];
  rowData$: Observable<IGridPlasmid[]>;
  rowSelection = "multiple";
  plasmidsUrl: string;
  plasmidSequenceDownloadUrl: string;
  paginationPagesize: number;
  ignoreSelectionChange = false;
  columnDefs;
  defaultColDef;
  downloadMode: string = null;
  downloadIconOpacity = 0.2;
  downloadIconCursor = 'default';
  firstDownloadPlasmidId: string = null;
  downloadRowCount: number = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorDialogService: ErrorDialogService,
    private fileSaverService: FileSaverService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.plasmidsUrl = environment.urls.plasmidsUrl;
    this.plasmidSequenceDownloadUrl = environment.urls.plasmidSequenceDownloadUrl;

    this.defaultColDef = {
      resizable: true
    };

    this.columnDefs = [
      {
        headerName: "Plasmid Id",
        field: "plasmid_id",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '10%'
        },
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          applyButton: false,
          clearButton: false
        },
        menuTabs: ["filterMenuTab"],
        cellClass: "text-is-wrapped"
      },
      {
        headerName: "Description",
        field: "description",
        valueFormatter: this.longValueFormatter,
        autoHeight: true,
        width: 300,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word'
        },
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          applyButton: false,
          clearButton: false
        },
        menuTabs: ["filterMenuTab"],
        cellClass: "text-is-wrapped"
      },
      {
        headerName: "Selectable Markers",
        field: "marker",
        valueFormatter: this.longValueFormatter,
        autoHeight: true,
        width: 200,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word'
        },
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          applyButton: false,
          clearButton: false
        },
        menuTabs: ["filterMenuTab"],
        cellClass: "text-is-wrapped"
      },
      { headerName: "Target",
        field: "target_name",
        valueFormatter: this.longValueFormatter,
        autoHeight: true,
        width: 200,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word'
        },
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          applyButton: false,
          clearButton: false
        },
        menuTabs: ["filterMenuTab"],
        cellClass: "text-is-wrapped"
      },
      { headerName: "Project",
        field: "project_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '20%'
        },
        sortable: true,
        filter: 'agSetColumnFilter',
        filterParams: {
          applyButton: false,
          clearButton: false
        },
        menuTabs: ["filterMenuTab"],
        cellClass: "text-is-wrapped"
      }
    ];

    this.paginationPagesize = 10;
    this.rowData$ = this.http.get<IGridPlasmid[]>(this.plasmidsUrl)
                      .pipe(
                        catchError(error => {
                          this.errorDialogService.openDialogForErrorResponse(
                            error,
                            ['message'],
                            "The plasmid inventory is not available."
                          );
                          const noResults: IGridPlasmid[] = [];
                          return of(noResults);
                        })
                      );
  }

  // This formatter should be used for any field that was generated
  // by the back-end as a comma-separated list string for improved UI visibility.
  longValueFormatter(params) {
    const unspacedValue = params.value.replace(/,\s/g, ",");
    const respacedValue = params.value.replace(/,/g, ", ");
    return respacedValue;
  }

  isExternalFilterPresent(): boolean {
    return true;
  }

  doesExternalFilterPass(node): boolean {
    // The row fields are at node.data.* .
    // console.log("node: ", JSON.stringify(node.data));
    // console.log("node.data.plasmid_id: ", node.data.plasmid_id);
    return this.filterMatch((node.data as IGridPlasmid).plasmid_id);
  }

  filterMatch(nodeField: string): boolean {
    if (nodeField === undefined) {
      return false;
    }
    if (!this.searchSet.length) {
      return true;
    }
    const cleanNodeField = nodeField.replace(/\s/g, "").toLowerCase();
    for ( const searchValue of this.searchSet as string[] ) {
      if (cleanNodeField === searchValue) {
        return true;
      }
    }
    return false;
  }

  onReturnKeySearch(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const searchArgs = (event.target as HTMLInputElement).value;
    this.onSearch(searchArgs);
  }

  onSearch(searchArgs: string): void {
    // Compute the search set here from the entered search args.
    const rawSet: string[] = searchArgs.split(',');
    this.searchSet = [];
    for ( const value of rawSet as string[] ) {
      const cleanedValue = value.replace(/\s/g, "").toLowerCase();
      if (cleanedValue.length) {
        this.searchSet.push(cleanedValue);
      }
    }

    // Trigger the search here.
    this.agGrid.gridOptions.api.setFilterModel(null);  // Cancels all on-going filtering.
    this.agGrid.gridOptions.api.onFilterChanged();     // Fire trigger.
  }

  onRefresh() {
    // Reset the search args to "everything".
    this.searchSet = [];

    // Trigger the search here.
    this.agGrid.gridOptions.api.setFilterModel(null);  // Cancels all on-going filtering.
    this.agGrid.gridOptions.api.onFilterChanged();     // Fire trigger.
  }

  OnDownloadModeChange(change: MatRadioChange) {
    this.downloadIconCursor = 'pointer';
    this.downloadIconOpacity = 1.0;
    this.downloadMode = change.value;
    console.log("Set Download Mode: ", this.downloadMode);
    // change.source
    // change.value
    // enable the download cloud here.
  }

  ngAfterViewInit() {
    // Grid options can finally be set at this point.
    this.agGrid.gridOptions.animateRows = true;

    // Note: these two local class methods below are called internally by the ag-Grid,
    // and thus their class closures are lost, making it impossible to call any other
    // class methods within them if needed. So use .bind(this) when adding this method
    // to the gridOptions.
    this.agGrid.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(
      this
    );
    this.agGrid.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(
      this
    );

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
      }
    ];

    // Responsive window behavior.
    this.agGrid.api.sizeColumnsToFit();
    window.onresize = () => {
      this.agGrid.api.sizeColumnsToFit();
    };
  }

  onSelectionChanged() {
    if (!this.ignoreSelectionChange) {
      const selectedRow: IGridPlasmid = this.agGrid.gridOptions.api.getSelectedRows()[0];  // Here, always an array of one row.
      this.router.navigateByUrl('/home/plasmid-detail/' + (selectedRow as IGridPlasmid).plasmid_id);
    }
  }

  onDownload() {
    switch (this.downloadMode) {
      case 'excel':
        this.plasmidExcelDownload();
        break;
      case 'fasta':
        this.fastaDownload();
        break;
      case 'gb':
        this.genbankDownload();
        break;
      default:
        break;
    }
  }

  plasmidExcelDownload() {
    this.ignoreSelectionChange = true;
    let rowCount = 0;

    this.agGrid.api.forEachNode( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });
    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowCount++;
      rowNode.setSelected(true, false);
    });

    if (rowCount > 0) {
      const params = {
        fileName: 'PlasmidsSearch',
        onlySelectedAllPages: true
      };
      this.agGrid.api.exportDataAsExcel(params);
    } else {
      this.errorDialogService.openDialogForMessages("No plasmids have been chosen. Plasmid Export is cancelled. Try again.");
    }

    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });

    setTimeout( () => { this.ignoreSelectionChange = false; }, 1000 );
  }

  fastaDownload() {
    const downloadUrl = this.buildPlasmidSequenceDownloadUrl();

    if (downloadUrl) {
      if (this.downloadRowCount > 5) {
        if (!this.alertService.confirmGeneral('You will download more than FIVE files. Do you wish to proceed?')) {
          return;
        }
      }

      this.http.get(downloadUrl, { observe: 'response', responseType: 'blob' })
      .pipe(
        catchError(error => {
          console.log("ERROR: ", JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(
            error,
            ['message'],
            "FASTA downloads failed. See admin."
          );
          return of(null);
        })
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response) {
          this.downloadRowCount === 1 ?
            this.fileSaverService.save(response.body, `${this.firstDownloadPlasmidId}.fasta`) :
            this.fileSaverService.save(response.body, 'FASTA_files.zip');
        }
      });
    } else {
      this.errorDialogService.openDialogForMessages("No plasmids have been chosen. FASTA download is cancelled. Try again.");
    }
  }

  genbankDownload() {
    const downloadUrl = this.buildPlasmidSequenceDownloadUrl();

    if (downloadUrl) {
      if (this.downloadRowCount > 5) {
        if (!this.alertService.confirmGeneral('You will download more than FIVE files. Do you wish to proceed?')) {
          return;
        }
      }

      this.http.get(downloadUrl, { observe: 'response', responseType: 'blob' })
      .pipe(
        catchError(error => {
          console.log("ERROR: ", JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(
            error,
            ['message'],
            "GenBank downloads failed. See admin."
          );
          return of(null);
        })
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response) {
          this.downloadRowCount === 1 ?
            this.fileSaverService.save(response.body, `${this.firstDownloadPlasmidId}.gb`) :
            this.fileSaverService.save(response.body, 'GenBank_files.zip');
        }
      });
    } else {
      this.errorDialogService.openDialogForMessages("No plasmids have been chosen. GenBank download is cancelled. Try again.");
    }
  }

  // Build the URL for downloading FASTA/GenBank files corresponding to the
  // currently displayed plasmids. If no plasmids are displayed, a null is returned.
  // Note the two side effects here.
  buildPlasmidSequenceDownloadUrl(): string {
    let rowCount = 0;
    let fullPlasmidSequenceDownloadUrl = '';
    fullPlasmidSequenceDownloadUrl = this.plasmidSequenceDownloadUrl + '?plasmid_id=';
    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      if (!rowCount) {
        this.firstDownloadPlasmidId = rowNode.data.plasmid_id;   // Side effect.
        fullPlasmidSequenceDownloadUrl = fullPlasmidSequenceDownloadUrl.concat(rowNode.data.plasmid_id);
      } else {
        fullPlasmidSequenceDownloadUrl = fullPlasmidSequenceDownloadUrl.concat(',' + rowNode.data.plasmid_id);
      }
      rowCount++;
    });
    this.downloadRowCount = rowCount;      // Side effect.
    return rowCount ? fullPlasmidSequenceDownloadUrl.concat(`&file_format=${this.downloadMode}`) : null;
  }
}
