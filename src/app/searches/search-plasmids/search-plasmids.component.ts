import { Component, OnInit, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { devUrls, prodUrls } from "../../../environments/environment";

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

  rowData: any;
  plasmidsUrl: string;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.plasmidsUrl = devUrls.plasmidsUrl;
    } else {
      this.plasmidsUrl = prodUrls.plasmidsUrl;
    }
  }

  ngOnInit() {
    this.rowData = this.http.get(this.plasmidsUrl);
  }
}
