import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { LicenseManager } from "@ag-grid-enterprise/all-modules";

// We want change detection to operate normally (single-detection) for ALL
// environments outside of using in-memory mock data for realistic operation.
//
// When using in-memory data, we must eliminate all side-effect
// change-detection errors via double-detection BEFORE moving to a more exterior environment.

if (!environment.inMemoryData) {
  enableProdMode();
}

LicenseManager.setLicenseKey("AbSci_Protein_Target_Database_single_1_Devs__11_November_2020_[v2]_MTYwNTA1MjgwMDAwMA==124b6a9b7eaea9a1e95847a569e45996");

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
