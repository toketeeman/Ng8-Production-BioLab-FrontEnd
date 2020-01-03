import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { MatRadioChange, MatRadioButton } from '@angular/material';

import { AgGridAngular } from "@ag-grid-community/angular";
import { AllModules, Module } from "@ag-grid-enterprise/all-modules";

import { ITargetProperties, ITargetPropertyList, IGridBioProperty } from "../../protein-expression.interface";
import { environment } from "../../../environments/environment";
import { ErrorDialogService } from "../../dialogs/error-dialog/error-dialog.service";

@Component({
  selector: 'app-target-property',
  templateUrl: './target-property.component.html',
  styleUrls: ['./target-property.component.scss']
})
export class TargetPropertyComponent implements OnInit, AfterViewInit {
  @ViewChild("proteinPropertiesButton", { static: false }) proteinPropertiesButton: MatRadioButton;
  @ViewChild("targetPropertyGrid", { static: false }) targetPropertyGrid: AgGridAngular;

  currentTargetId: string;
  targetsPropertyUrl: string;
  proteinName = '';
  subunitNames: string[] = [];
  propertySelectionMode: string;
  propertyListGridData$: Observable<IGridBioProperty[]>;
  public modules: Module[] = AllModules;
  public domLayout;
  propertyColumnDefs;
  propertyLists: ITargetPropertyList[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private errorDialogService: ErrorDialogService
  ) { }

  ngOnInit() {
    this.currentTargetId = this.route.snapshot.paramMap.get('id');
    console.log("Property Target Id: ", this.currentTargetId);

    if (environment.inMemoryData) {
      this.targetsPropertyUrl = environment.urls.targetsPropertyUrl;
    } else {
      this.targetsPropertyUrl = environment.urls.targetsPropertyUrl + '?target_id=' + this.currentTargetId;
    }

    this.domLayout = 'autoHeight';

    this.propertyColumnDefs = [
      {
        headerName: "Property",
        headerClass: "target-property-header",
        field: "name",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '50%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Value",
        headerClass: "target-property-header",
        field: "value",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
          width: '20%'
        },
        sortable: false,
        menuTabs: []
      },
      {
        headerName: "Unit",
        headerClass: "target-property-header",
        field: "unit",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          width: '25%'
        },
        sortable: false,
        menuTabs: []
      }
    ];

    this.http.get<ITargetProperties>(this.targetsPropertyUrl)
      .pipe(
        tap((response: ITargetProperties) => {
          this.activatePropertyListSelection(response);
        }),
        catchError(error => {
          console.log(JSON.stringify(error));
          this.errorDialogService.openDialogForErrorResponse(
            error,
            ['message'],
            "Biophysical properties for this target could not be found."
          );
          const noResult: ITargetProperties = null;
          return of(noResult);
        })
      ).subscribe();
  }

  ngAfterViewInit() {
    // Responsive window behavior, with debouncing.
    this.targetPropertyGrid.api.sizeColumnsToFit();
    let timeout;
    window.onresize = () => {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(
        () => {
          this.targetPropertyGrid.api.sizeColumnsToFit();
        }
      );
    };
  }

  activatePropertyListSelection(response: ITargetProperties) {
    this.propertyLists[0] = response.protein;
    let propListButtonId = 'propList' + 0;
    const proteinRadioButtonElement = document.getElementById(propListButtonId);
    proteinRadioButtonElement.style.visibility = 'visible';

    let subunitIndex = 1;
    for ( const subunitPropertyList of response.subunits ) {
      this.propertyLists[subunitIndex] = subunitPropertyList;
      propListButtonId = 'propList' + subunitIndex++;
      document.getElementById(propListButtonId).style.visibility = 'visible';
    }

    this.proteinPropertiesButton.checked = true;
    const change: MatRadioChange = new MatRadioChange(null, null);
    change.value = '0';
    this.OnPropertyListSelectionChange(change);
  }

  OnPropertyListSelectionChange(change: MatRadioChange) {
    const propertyListIndex = +change.value;
    const propertyList = this.propertyLists[propertyListIndex];

    const gridPropertyList: IGridBioProperty[] = [];
    gridPropertyList.push({ name: 'Average Molecular Weight (Oxidized)',
                            value: propertyList.avg_molecular_weight_ox,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Average Molecular Weight (Reduced)',
                            value: propertyList.avg_molecular_weight_red,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Monoisotopic Molecular Weight (Oxidized)',
                            value: propertyList.monoisotopic_weight_ox,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Monoisotopic Molecular Weight (Reduced)',
                            value: propertyList.monoisotopic_weight_red,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Isoelectric Point',
                            value: propertyList.isoelectric_point,
                            unit: 'pH'});
    gridPropertyList.push({ name: 'Average Hydrophobicity (Gravy)',
                            value: propertyList.gravy,
                            unit: 'H/#Residues'});
    gridPropertyList.push({ name: 'Aromaticity',
                            value: propertyList.aromaticity,
                            unit: 'ppm (NICS)'});
    gridPropertyList.push({ name: 'Mass Extinction Coefficient @ 280nm (Oxidized)',
                            value: propertyList.e280_mass_ox,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Mass Extinction Coefficient @ 280nm (Reduced)',
                            value: propertyList.e280_mass_red,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Mass Extinction Coefficient @ 214nm',
                            value: propertyList.e214_mass,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient @ 280nm (Oxidized)',
                            value: propertyList.e280_molar_ox,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient @ 280nm (Reduced)',
                            value: propertyList.e280_molar_red,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient @ 214nm',
                            value: propertyList.e214_molar,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: null,     // Work-around to avoid ag-Grid's flickering/obscuring the last data row.
                            value: null,
                            unit: null});

    this.propertyListGridData$ = of(gridPropertyList);
  }

  // Go back to the current target search.
  onBackToSearch() {
    this.router.navigateByUrl("/home/search-targets");
  }

  // Go back to the current target details.
  onBackToDetails() {
    this.router.navigateByUrl("/home/target-detail/" + this.currentTargetId);
  }

}
