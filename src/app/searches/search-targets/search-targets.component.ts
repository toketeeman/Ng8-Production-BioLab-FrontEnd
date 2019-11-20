import {
  Component,
  OnInit,
  isDevMode,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';

import { devUrls, prodUrls } from "../../../environments/environment-urls";
import { IGridTarget } from "../../protein-expression.interface";
import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";

@Component({
  templateUrl: "./search-targets.component.html",
  styleUrls: ["./search-targets.component.scss"]
})
export class SearchTargetsComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  public modules: Module[] = AllModules;
  searchSet: string[] = [];
  rowData$: Observable<IGridTarget[]>;
  rowSelection = "single";
  targetsUrl: string;
  paginationPagesize: number;

  columnDefs = [
    { headerName: "Target", field: "target", sortable: true, filter: true },
    { headerName: "Partner", field: "partner", sortable: true, filter: true },
    { headerName: "Class", field: "class", sortable: true, filter: true },
    { headerName: "Subunits", field: "subunits", sortable: true, filter: true },
    { headerName: "Gene Count", field: "geneCount", sortable: true, filter: true },
    { headerName: "Project", field: "project", sortable: true, filter: true },
    { headerName: "Plasmid Count", field: "plasmidCount", sortable: true, filter: true }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorDialogService: ErrorDialogService) {}

  ngOnInit() {
    if (isDevMode()) {
      this.targetsUrl = devUrls.targetsUrl;
    } else {
      this.targetsUrl = prodUrls.targetsUrl;
    }

    this.paginationPagesize = 10;
    this.rowData$ = this.http.get<IGridTarget[]>(this.targetsUrl)
                      .pipe(
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
    return this.filterMatch((node.data as IGridTarget).target);
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
    rawSet.forEach((value: string) => {
      const cleanedValue = value.replace(/\s/g, "").toLowerCase();
      if (cleanedValue.length) {
        this.searchSet.push(cleanedValue);
      }
    });

    // Trigger the search here.
    this.agGrid.gridOptions.api.onFilterChanged();
  }

  onRefresh() {
    // Reset the search args to "everything".
    this.searchSet = [];

    // Trigger the search here.
    this.agGrid.gridOptions.api.onFilterChanged();
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

    // Responsive window behavior.
    this.agGrid.api.sizeColumnsToFit();
    window.onresize = () => {
      this.agGrid.api.sizeColumnsToFit();
    };
  }

  onSelectionChanged() {
    const selectedRow: IGridTarget = this.agGrid.gridOptions.api.getSelectedRows()[0];  // Here, always an array of one row.
    this.router.navigateByUrl('/home/target-detail/' + (selectedRow as IGridTarget).target);
  }

  onExcelExport() {
    return null;
  }
}
