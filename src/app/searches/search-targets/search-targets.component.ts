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

  ngAfterViewInit() {
    this.agGrid.api.sizeColumnsToFit();
  }
}
