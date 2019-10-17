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

  ngAfterViewInit() {
    this.agGrid.api.sizeColumnsToFit();
  }
}
