import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private router: Router) {}

  title = "Welcome to the Protein Target Database";
  // @TODO add route subscription to dynamically change nav title on route
}
