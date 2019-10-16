import { Component, OnInit, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { devUrls, prodUrls } from "../../../environments/environment-urls";
import { Observable } from "rxjs";
import { IGridPlasmid } from "../../protein-expression.interface";

@Component({
  selector: "app-search-plasmids",
  templateUrl: "./search-plasmids.component.html",
  styleUrls: ["./search-plasmids.component.css"]
})
export class SearchPlasmidsComponent implements OnInit {
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

  rowData$: Observable<IGridPlasmid>;
  plasmidsUrl: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (isDevMode()) {
      this.plasmidsUrl = devUrls.plasmidsUrl;
    } else {
      this.plasmidsUrl = prodUrls.plasmidsUrl;
    }

    this.rowData$ = this.http.get<IGridPlasmid>(this.plasmidsUrl);
  }
}
