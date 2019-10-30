import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IGridPlasmidDetail } from "../../protein-expression.interface";
import { devUrls, prodUrls } from "../../../environments/environment-urls";

@Component({
  selector: 'app-plasmid-detail',
  templateUrl: './plasmid-detail.component.html',
  styleUrls: ['./plasmid-detail.component.scss']
})
export class PlasmidDetailComponent implements OnInit {

  plasmidId: string;
  plasmidsUrl: string;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient) { }

  ngOnInit() {
    this.plasmidId = this.route.snapshot.paramMap.get('id');

    if (isDevMode()) {
      this.plasmidsUrl = devUrls.plasmidsUrl;
    } else {
      this.plasmidsUrl = prodUrls.plasmidsUrl;
    }

    this.http.get<IGridPlasmidDetail>(this.plasmidsUrl + '/' + this.plasmidId);
    // subscribe here

  }

}
