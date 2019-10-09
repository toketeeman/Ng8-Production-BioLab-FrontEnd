import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MatMenuModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatDividerModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { TargetRegistrationService } from "./services/target-registration.service";
import { AuthenticationService } from "./services/authentication.service";
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

const appImports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  StoreModule.forRoot(reducers, {}),
  EffectsModule.forRoot([AuthEffects, TargetEffects, InteractionsEffects]),
  MatMenuModule,
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
  MatTooltipModule,
  ReactiveFormsModule
];

if (!environment.production) {
  console.log("Adding in-memory data service");
  appImports.push(
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
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
    PageNotFoundComponent
  ],
  imports: appImports,
  providers: [
    AuthenticationService,
    TargetRegistrationService,
    InMemoryDataService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
