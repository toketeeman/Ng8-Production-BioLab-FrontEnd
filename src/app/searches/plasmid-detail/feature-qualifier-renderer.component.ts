import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-feature-qualifier',
  templateUrl: './feature-qualifier-renderer.component.html',
  styleUrls: ['./feature-qualifier-renderer.component.scss']
})
export class FeatureQualifierRenderer implements ICellRendererAngularComp {
  featureQualifier: any[];

  constructor() { }

  refresh(params: any): boolean {
    throw new Error("Method not implemented.");
  }

  agInit(params: any): void {
    this.featureQualifier = params.value;  // A feature qualifier is an array of qualifiers.
  }
  
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }
}
