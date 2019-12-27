import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NewTargetComponent } from "./new-target/new-target.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";
import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { SignedOutGuard } from "./guards/signed-out.guard";
import { RegistrationSummaryComponent } from './registration-summary/registration-summary.component';
import { UnsavedChangesGuard } from "./guards/unsaved-changes.guard";
import { CanAccessGuard } from "./guards/can-access.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SearchPlasmidsComponent } from "./searches/search-plasmids/search-plasmids.component";
import { PlasmidDetailComponent } from './searches/plasmid-detail/plasmid-detail.component';
import { SearchTargetsComponent } from "./searches/search-targets/search-targets.component";
import { TargetDetailComponent } from './searches/target-detail/target-detail.component';
import { TargetPropertyComponent } from './searches/target-property/target-property.component';
import { SlimsComponent } from './slims/slims/slims.component';
import { SlimsAccessGuard } from "./guards/slims-access.guard";

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
        component: RegistrationSummaryComponent,
        canActivate: [CanAccessGuard],
        canDeactivate: [CanAccessGuard]
      },
      {
        path: "search-plasmids",
        component: SearchPlasmidsComponent
      },
      {
        path: "plasmid-detail/:id",
        component: PlasmidDetailComponent
      },
      {
        path: "search-targets",
        component: SearchTargetsComponent
      },
      {
        path: "target-detail/:id",
        component: TargetDetailComponent
      },
      {
        path: "target-property/:id",
        component: TargetPropertyComponent
      }
    ]
  },
  {
    path: "slims",
    component: SlimsComponent,
    canActivate: [SlimsAccessGuard],
    children: [
      {
        path: "plasmids/:id",
        component: PlasmidDetailComponent
      }
    ]
  },
  { path: "", redirectTo: "home/add-target", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
