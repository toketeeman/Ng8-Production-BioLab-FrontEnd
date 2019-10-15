import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-plasmids",
  templateUrl: "./search-plasmids.component.html",
  styleUrls: ["./search-plasmids.component.css"]
})
export class SearchPlasmidsComponent implements OnInit {
  columnDefs = [
    { headerName: "Make", field: "make", sortable: true, filter: true },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true }
  ];

  rowData = [
    { make: "Toyota", model: "Celica", price: "35000" },
    { make: "Ford", model: "Mondeo", price: "32000" },
    { make: "Porche", model: "Boxter", price: "72000" }
  ];

  constructor() {}

  ngOnInit() {}
}
