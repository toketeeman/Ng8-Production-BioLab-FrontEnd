import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

import { IGridTarget } from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { environment } from "../../../environments/environment";

@Component({
  templateUrl: "./search-targets.component.html",
  styleUrls: ["./search-targets.component.scss"]
})
export class SearchTargetsComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  public modules: Module[] = AllModules;
  searchSet: string[] = [];
  rowData$: Observable<IGridTarget[]>;
  rowSelection = "multiple";
  targetsUrl: string;
  paginationPagesize: number;
  ignoreSelectionChange = false;
  columnDefs;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorDialogService: ErrorDialogService) {}

  ngOnInit() {
    this.targetsUrl = environment.urls.targetsUrl;

    this.columnDefs = [
      {
        field: "target_id",
        hide: true
      },
      {
        headerName: "Target",
        field: "target_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Partner",
        field: "partner_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Class",
        field: "class_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Subunits",
        field: "subunit_count",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Gene Count",
        field: "gene_count",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Project",
        field: "project_name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
        headerName: "Plasmid Count",
        field: "plasmid_count",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '14%'
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
    this.rowData$ = this.http.get<IGridTarget[]>(this.targetsUrl)
                      .pipe(
                        // tap((response) => {
                        //   console.log("RESPONSE: ", JSON.stringify(response));
                        //   console.log("END OF RESPONSE");
                        // }),
                        catchError(error => {
                          this.errorDialogService.openDialogForErrorResponse(error, ['message']);
                          const noResults: IGridTarget[] = [];
                          return of(noResults);
                        })
                      );
  }

  isExternalFilterPresent(): boolean {
    return true;
  }

  doesExternalFilterPass(node): boolean {
    // The row fields are at node.data.* .
    // console.log("node: ", JSON.stringify(node.data));
    // console.log("node.data.target: ", node.data.target);
    return this.filterMatch((node.data as IGridTarget).target_name);
  }

  filterMatch(nodeField: string): boolean {
    if (nodeField === undefined) {
      return false;
    }
    if (!this.searchSet.length) {
      return true;
    }
    const cleanNodeField = nodeField.replace(/\s/g, "").toLowerCase();
    for (const searchValue of this.searchSet) {
      if (cleanNodeField === searchValue) {
        return true;
      }
    }
    return false;
  }

  onReturnSearch(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const searchArgs = (event.target as HTMLInputElement).value;
    this.onSearch(searchArgs);
  }

  onSearch(searchArgs: string): void {
    // Compute the search set here from the entered search args.
    const rawSet: string[] = searchArgs.split(',');
    this.searchSet = [];
    for ( const value of rawSet ) {
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
    const selectedRow: IGridTarget = this.agGrid.gridOptions.api.getSelectedRows()[0];  // Here, always an array of one row.
    this.router.navigateByUrl('/home/target-detail/' + (selectedRow as IGridTarget).target_id);
  }

  onExcelExport() {
    const params = {
      fileName: 'TargetsSearch',
      onlySelectedAllPages: true
    };

    this.ignoreSelectionChange = true;

    this.agGrid.api.forEachNode( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });
    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowNode.setSelected(true, false);
    });

    this.agGrid.api.exportDataAsExcel(params);

    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      rowNode.setSelected(false, false);
    });

    setTimeout( () => { this.ignoreSelectionChange = false; }, 1000 );
  }
}
