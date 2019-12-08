import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {
  MatCardModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatMenuModule,
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { NguCarouselModule } from "@ngu/carousel";
import { AgGridModule } from "@ag-grid-community/angular";

import { AppRoutingModule } from "./app-routing.module";
import { InMemoryDataService } from "./services/in-memory-data.service";
import { TokenInterceptor } from "./services/token.interceptor";
import { AuthEffects } from "./store/effects/auth.effects";
import { TargetEffects } from "./store/effects/target.effects";
import { InteractionsEffects } from "./store/effects/interactions.effects";
import { reducers } from "./store/app.states";
import { AppComponent } from "./app.component";
import { NewTargetComponent } from "./new-target/new-target.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";
import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { RegistrationSuccessComponent } from "./registration-success/registration-success.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { environment } from "../environments/environment";
import { SearchPlasmidsComponent } from "./searches/search-plasmids/search-plasmids.component";
import { SearchTargetsComponent } from "./searches/search-targets/search-targets.component";
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { PlasmidDetailComponent } from './searches/plasmid-detail/plasmid-detail.component';
import { FeatureQualifierRenderer } from './searches/plasmid-detail/feature-qualifier-renderer.component';
import { SlimsComponent } from './slims/slims/slims.component';
import { TargetDetailComponent } from './searches/target-detail/target-detail.component';
import { RegistrationSummaryComponent } from './registration-summary/registration-summary.component';

const appImports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  StoreModule.forRoot(reducers, {}),
  EffectsModule.forRoot([AuthEffects, TargetEffects, InteractionsEffects]),
  MatCardModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatMenuModule,
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  NguCarouselModule,
  AgGridModule.withComponents([BrowserAnimationsModule, FeatureQualifierRenderer])
];

if (!environment.production && environment.inMemoryData) {
  console.log(
    "In dev.local (default environment) mode. Double-change-detection will be active and in-Memory DB will be the backend."
  );
  appImports.push(
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  );
} else {
  console.log(
    "In Angular production mode, i.e. single-change-detection. Backend is dictated by replaced environment.ts ."
  );
}

@NgModule({
  declarations: [
    AppComponent,
    NewTargetComponent,
    SubunitInteractionsComponent,
    LoginFormComponent,
    HomeComponent,
    RegistrationSuccessComponent,
    PageNotFoundComponent,
    SearchPlasmidsComponent,
    SearchTargetsComponent,
    AutoFocusDirective,
    ErrorDialogComponent,
    PlasmidDetailComponent,
    FeatureQualifierRenderer,
    SlimsComponent,
    TargetDetailComponent,
    RegistrationSummaryComponent
  ],
  imports: appImports,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent, FeatureQualifierRenderer]
})
export class AppModule {}
