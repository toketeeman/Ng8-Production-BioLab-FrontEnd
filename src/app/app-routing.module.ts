import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewTargetComponent } from "./new-target/new-target.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";
import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { SignedOutGuard } from "./guards/signed-out.guard";
import { RegistrationSuccessComponent } from "./registration-success/registration-success.component";
import { UnsavedChangesGuard } from "./guards/unsaved-changes.guard";
import { CanAccessGuard } from "./guards/can-access.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [SignedOutGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "add-target",
        component: NewTargetComponent,
        canDeactivate: [UnsavedChangesGuard]
      },
      {
        path: "subunit-interactions",
        component: SubunitInteractionsComponent,
        canActivate: [CanAccessGuard],
        canDeactivate: [UnsavedChangesGuard]
      },
      {
        path: "success",
        component: RegistrationSuccessComponent,
        canActivate: [CanAccessGuard],
        canDeactivate: [CanAccessGuard]
      }
    ]
  },
  // @TODO add 404 page & route
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
