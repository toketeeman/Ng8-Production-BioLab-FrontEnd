import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  // @TODO add route subscription to dynamically change nav title on route

  ngOnInit() {
    // this.title = "Welcome to the Protein Target Database";
  }
}
