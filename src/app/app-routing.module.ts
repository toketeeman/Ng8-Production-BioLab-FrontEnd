import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewTargetComponent } from "./new-target/new-target.component";
import { SubunitInteractionsComponent } from "./subunit-interactions/subunit-interactions.component";

const routes: Routes = [
  { path: "add-target", component: NewTargetComponent },
  { path: "subunit-interactions", component: SubunitInteractionsComponent }
  // @TODO add /success state
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
