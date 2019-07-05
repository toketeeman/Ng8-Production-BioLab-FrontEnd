import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewTargetComponent } from "./new-target/new-target.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";
import { LoginFormComponent } from "./auth/login-form/login-form.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginFormComponent },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "add-target", component: NewTargetComponent },
      { path: "subunit-interactions", component: SubunitInteractionsComponent }
    ]
  },
  // @TODO add routeGuard here with redirect to /login
  { path: "", redirectTo: "home", pathMatch: "full" }

  // @TODO add /success state
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
