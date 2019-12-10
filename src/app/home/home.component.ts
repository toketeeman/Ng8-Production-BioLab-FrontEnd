import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";


@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  url = "";
  isAuthenticated = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isAuthenticated = !!this.authenticationService.getToken();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/home/plasmid-detail')) {  // This url suffixes a plasmid id.
          this.url = '/home/plasmid-detail';
        } else if (event.url.startsWith('/home/target-detail')) {   // This url suffixes a target id.
          this.url = '/home/target-detail';
        } else {
          this.url = event.url;
        }
      }
    });
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

}
