import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";
import { TargetSearchStoreService } from "../services/target-search-store.service";


@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  url = "";
  isAuthenticated = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private targetSearchStoreService: TargetSearchStoreService) { }

  ngOnInit() {
    this.isAuthenticated = !!this.authenticationService.getToken();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/home/plasmid-detail')) {  // This url suffixes a plasmid id.
          this.url = '/home/plasmid-detail';
        } else if (event.url.startsWith('/home/target-detail')) {   // This url suffixes a target id.
          this.url = '/home/target-detail';
        } else if (event.url.startsWith('/home/target-property')) {   // This url suffixes a target id.
          this.url = '/home/target-property';
        }else {
          this.url = event.url;
        }
      }
    });
  }

  logout(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl("/login");
  }

  goToRegisterNewTarget() {
    this.targetSearchStoreService.resetTargetSearchState();
    this.router.navigateByUrl("/home/add-target");
  }

  goToSearchTargets() {
    this.targetSearchStoreService.resetTargetSearchState();
    this.router.navigateByUrl("/home/search-targets");
  }

  goToSearchPlasmids() {
    this.targetSearchStoreService.resetTargetSearchState();
    this.router.navigateByUrl("/home/search-plasmids");
  }

  disableForNonSubmitter(): boolean {
    if (!this.authenticationService.hasSubmitterRole()) {
      return true;
    }
    return false;
  }

  disableForNonViewer(): boolean {
    if (!this.authenticationService.hasViewerRole()) {
      return true;
    }
    return false;
  }
}
