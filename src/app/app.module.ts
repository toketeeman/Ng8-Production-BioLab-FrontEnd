import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
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
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [TargetRegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
