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
import { IGridPlasmid } from "../../protein-expression.interface";
import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: "app-search-plasmids",
  templateUrl: "./search-plasmids.component.html",
  styleUrls: ["./search-plasmids.component.css"]
})
export class SearchPlasmidsComponent implements OnInit, AfterViewInit {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  private searchArg = "";
  private searchSet: string[] = [];

  columnDefs = [
    {
      headerName: "PlasmidId",
      field: "plasmidId",
      sortable: true,
      filter: true
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true
    },
    {
      headerName: "Selectable Markers",
      field: "markers",
      sortable: true,
      filter: true
    },
    { headerName: "Protein", field: "protein", sortable: true, filter: true },
    { headerName: "Project", field: "project", sortable: true, filter: true },
    { headerName: "SLIMS Link", field: "slimsId", sortable: true, filter: true }
  ];

  private rowData$: Observable<IGridPlasmid>;
  private plasmidsUrl: string;
  private paginationPagesize: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (isDevMode()) {
      this.plasmidsUrl = devUrls.plasmidsUrl;
    } else {
      this.plasmidsUrl = prodUrls.plasmidsUrl;
    }

    this.paginationPagesize = 10;
    this.rowData$ = this.http.get<IGridPlasmid>(this.plasmidsUrl);
  }

  isExternalFilterPresent(): boolean {
    return true;
  }

  doesExternalFilterPass(node): boolean {
    // The row fields are at node.data.* .
    //console.log("node: ", JSON.stringify(node.data));
    //console.log("node.data.plasmidId: ", node.data.plasmidId);
    return this.filterMatch((node.data as IGridPlasmid).plasmidId);
  }

  filterMatch(nodeField: string): boolean {
    if (nodeField === undefined) {
      return false;
    }
    console.log("nodeField: ", nodeField);
    if (!this.searchSet.length) {
      return true; 
    }
    let lowerNodeField = nodeField.toLowerCase();
    for (let searchValue of this.searchSet) {
      if (lowerNodeField === searchValue) {
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
