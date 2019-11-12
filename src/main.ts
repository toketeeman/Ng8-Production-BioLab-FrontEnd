import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";

if (environment.production) {
  enableProdMode();
}

LicenseManager.setLicenseKey("124b6a9b7eaea9a1e95847a569e45996");

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
