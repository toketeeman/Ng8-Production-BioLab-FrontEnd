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

import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module, FirstDataRenderedEvent } from "@ag-grid-enterprise/all-modules";

import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";
import { TargetSearchStoreService } from "../../services/target-search-store.service";
import { IGridTarget } from "../../protein-expression.interface";
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
    private errorDialogService: ErrorDialogService,
    private targetSearchStoreService: TargetSearchStoreService) {}

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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
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
        cellClass: "text-is-wrapped",
        hide: true
      }
    ];

    this.paginationPagesize = 10;

    // Load the cache for the grid. This is our "working set" of targets.
    this.rowData$ = this.http.get<IGridTarget[]>(this.targetsUrl)
                      .pipe(
                        catchError(error => {
                          this.errorDialogService.openDialogForErrorResponse(
                            error,
                            ['message'],
                            "The target inventory is not available."
                          );
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
    for ( const value of rawSet as string[]) {
      const cleanedValue = value.replace(/\s/g, "").toLowerCase();
      if (cleanedValue.length) {
        this.searchSet.push(cleanedValue);
      }
    }

    // Store the new search state.
    this.targetSearchStoreService.storeTargetSearchState(this.searchSet);

    // Trigger the entered target search here.
    this.agGrid.gridOptions.api.setFilterModel(null);  // Cancels all on-going filtering.
    this.agGrid.gridOptions.api.onFilterChanged();     // Fire trigger.
  }

  onRefresh() {
    // Reset the search args to "everything".
    this.searchSet = [];
    this.targetSearchStoreService.storeTargetSearchState(this.searchSet);

    // Trigger the refresh target search here.
    this.agGrid.gridOptions.api.setFilterModel(null);  // Cancels all on-going filtering.
    this.agGrid.gridOptions.api.onFilterChanged();     // Fire trigger.
  }

  onRestore(event: FirstDataRenderedEvent) {
    // Retrieve the last search state and set it here.
    this.searchSet = this.targetSearchStoreService.retrieveTargetSearchState();

    // Trigger the restored target search here.
    this.agGrid.gridOptions.api.setFilterModel(null);  // Cancels all on-going filtering.
    this.agGrid.gridOptions.api.onFilterChanged();     // Fire trigger.

    // Now display the restored search state.
    this.agGrid.gridOptions.columnApi
      .setColumnsVisible([
        'target_name', 'partner_name', 'class_name', 'subunit_count', 'gene_count', 'project_name', 'plasmid_count'
      ], true);
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

    this.agGrid.gridOptions.rowBuffer = 10;   // In fact, the default is also 10.

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

    // Restore the current search state once the grid cache has been loaded.
    this.agGrid.gridOptions.onFirstDataRendered = this.onRestore.bind(this);

    // Responsive window behavior.
    this.agGrid.api.sizeColumnsToFit();
    window.onresize = () => {
      this.agGrid.api.sizeColumnsToFit();
    };
  }

  onSelectionChanged() {
    // Store the current target search state before going to the target details.
    this.searchSet = [];
    this.agGrid.api.forEachNodeAfterFilterAndSort( (rowNode, index) => {
      const cleanedValue = (rowNode.data as IGridTarget).target_name.replace(/\s/g, "").toLowerCase();
      if (cleanedValue.length) {
        this.searchSet.push(cleanedValue);
      }
    });
    this.targetSearchStoreService.storeTargetSearchState(this.searchSet);

    // Now compute the destination of the details and go there.
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
