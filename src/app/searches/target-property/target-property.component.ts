import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, take, takeUntil } from 'rxjs/operators';

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
  @ViewChild("proteinPropertiesButton", { static: false }) proteinPropertiesButton: ElementRef<HTMLElement>;
  @ViewChild("targetPropertyGrid", { static: false }) targetPropertyGrid: AgGridAngular;

  currentTargetId: string;
  targetsPropertyUrl: string;
  proteinName = '';
  subunitNames: string[] = [];
  propertySelectionMode: string;
  propertyData$: Observable<ITargetProperties>;
  propertyListData$: Observable<IGridBioProperty[]>;
  public modules: Module[] = AllModules;
  public domLayout;
  propertyColumnDefs;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private errorDialogService: ErrorDialogService
  ) { }

  ngOnInit() {
    this.currentTargetId = this.route.snapshot.paramMap.get('id');
    console.log("Target Id: ", this.currentTargetId);

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
        field: "property",
        autoHeight: true,
        cellStyle: {
          'white-space': 'normal',
          'overflow-wrap': 'break-word',
          'font-weight': 'bold',
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
          'font-weight': 'bold',
          width: '25%'
        },
        sortable: false,
        menuTabs: []
      }
    ];

    this.propertyData$ = this.http.get<ITargetProperties>(this.targetsPropertyUrl)
    .pipe(
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
    );
  }

  ngAfterViewInit() {
    // Pre-select the protein radio button for user's convenience.
    this.proteinPropertiesButton.nativeElement.click();

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

  OnPropertySelectionChange(targetPropertyList: ITargetPropertyList) {
    const gridPropertyList: IGridBioProperty[] = [];
    gridPropertyList.push({ name: 'Monoisotropic MW Oxidized',
                            value: targetPropertyList.monoiso_mw_ox,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Average MW Reduced',
                            value: targetPropertyList.ave_mw_red,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Monoisotropic MW Reduced',
                            value: targetPropertyList.monoiso_mw_red,
                            unit: 'Da'});
    gridPropertyList.push({ name: 'Isoelectric Point',
                            value: targetPropertyList.isoelect_pt,
                            unit: 'pH'});
    gridPropertyList.push({ name: 'Gravy',
                            value: targetPropertyList.gravy,
                            unit: 'H/#Residues'});
    gridPropertyList.push({ name: 'Aromaticity',
                            value: targetPropertyList.aromaticity,
                            unit: 'ppm (NICS)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient 280 NM Oxidized',
                            value: targetPropertyList.mol_ext_coeff_280_nm_ox,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient 280 NM Reduced',
                            value: targetPropertyList.mol_ext_coeff_280_nm_red,
                            unit: 'M^(-1) cm^(-1)'});
    gridPropertyList.push({ name: 'Molar Extinction Coefficient 214 NM',
                            value: targetPropertyList.mol_ext_coeff_214_nm,
                            unit: 'M^(-1) cm^(-1)'});

    this.propertyListData$ = of(gridPropertyList);
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
