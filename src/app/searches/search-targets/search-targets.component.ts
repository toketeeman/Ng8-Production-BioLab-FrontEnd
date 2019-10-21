import {
  Component,
  OnInit,
  isDevMode,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { devUrls, prodUrls } from "../../../environments/environment-urls";
import { Observable } from "rxjs";
import { IGridTarget } from "../../protein-expression.interface";
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: "app-search-targets",
  templateUrl: "./search-targets.component.html",
  styleUrls: ["./search-targets.component.css"]
})
export class SearchTargetsComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  private searchArg = "";
  private searchSet: string[] = [];

  columnDefs = [
    { headerName: "Target", field: "target", sortable: true, filter: true },
    { headerName: "Partner", field: "partner", sortable: true, filter: true },
    { headerName: "Subunits", field: "subunits", sortable: true, filter: true },
    { headerName: "Project", field: "project", sortable: true, filter: true },
    {
      headerName: "Plasmid Count",
      field: "plasmidCount",
      sortable: true,
      filter: true
    },
    { headerName: "PTMs", field: "ptms", sortable: true, filter: true }
  ];

  private rowData$: Observable<IGridTarget>;
  private targetsUrl: string;
  private paginationPagesize: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (isDevMode()) {
      this.targetsUrl = devUrls.targetsUrl;
    } else {
      this.targetsUrl = prodUrls.targetsUrl;
    }

    this.paginationPagesize = 10;
    this.rowData$ = this.http.get<IGridTarget>(this.targetsUrl);
  }

  isExternalFilterPresent(): boolean {
    return true;
  }

  doesExternalFilterPass(node): boolean {
    // The row fields are at node.data.* .
    //console.log("node: ", JSON.stringify(node.data));
    //console.log("node.data.target: ", node.data.target);
    return this.filterMatch((node.data as IGridTarget).target);
  }

  filterMatch(nodeField: string): boolean {
    if (nodeField === undefined) {
      return false;
    }
    console.log("nodeField: ", nodeField);
    if (!this.searchSet.length) {
      return true; 
    }
    let cleanNodeField = nodeField.replace(/\s/g, "").toLowerCase();
    for (let searchValue of this.searchSet) {
      if (cleanNodeField === searchValue) {
        return true;
      }
    }
    return false;
  }

  onSearch(searchArgs: string): void {
    //console.log("searchArgs: ", searchArgs);

    // Compute the search set here from the entered search args.
    const rawSet: string[] = searchArgs.split(',');
    this.searchSet = [];
    rawSet.forEach((value: string) => {
      const cleanedValue = value.replace(/\s/g, "").toLowerCase();
      if (cleanedValue.length) {
        this.searchSet.push(cleanedValue);
      }
    })

    console.log("searchSet: ", JSON.stringify(this.searchSet));

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

    this.agGrid.api.sizeColumnsToFit();
  }
}
