import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-target-property',
  templateUrl: './target-property.component.html',
  styleUrls: ['./target-property.component.scss']
})
export class TargetPropertyComponent implements OnInit {
  currentTargetId: string;
  targetsPropertyUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currentTargetId = this.route.snapshot.paramMap.get('id');
    console.log("Target Id: ", this.currentTargetId);

    if (environment.inMemoryData) {
      this.targetsPropertyUrl = environment.urls.targetsPropertyUrl;
    } else {
      this.targetsPropertyUrl = environment.urls.targetsPropertyUrl + '?target_id=' + this.currentTargetId;
    }


  }

}
