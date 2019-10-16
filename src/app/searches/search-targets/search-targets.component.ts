import { Component, OnInit, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { devUrls, prodUrls } from "../../../environments/environment-urls";
import { Observable } from "rxjs";
import { IGridTarget } from "../../protein-expression.interface";

@Component({
  selector: "app-search-targets",
  templateUrl: "./search-targets.component.html",
  styleUrls: ["./search-targets.component.css"]
})
export class SearchTargetsComponent implements OnInit {
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

  rowData$: Observable<IGridTarget>;
  targetsUrl: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (isDevMode()) {
      this.targetsUrl = devUrls.targetsUrl;
    } else {
      this.targetsUrl = prodUrls.targetsUrl;
    }

    this.rowData$ = this.http.get<IGridTarget>(this.targetsUrl);
  }
}
