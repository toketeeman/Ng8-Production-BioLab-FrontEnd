import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { AppRoutingModule } from "./app-routing.module";
import { MatMenuModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { NewTargetComponent } from "./new-target/new-target.component";
import { AddSubunitComponent } from "./add-subunit/add-subunit.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";
import { TargetRegistrationService } from "./target-registration.service";

@NgModule({
  declarations: [
    AppComponent,
    NewTargetComponent,
    AddSubunitComponent,
    SubunitInteractionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [TargetRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
