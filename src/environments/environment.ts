// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This the "default" operating mode: using the in-memory mock database
// and Angular development mode. This is equivalent to dev.local mode.
//
// The app is built and served with the simple command:
//
//   >ng serve
//

export const environment = {
  production: false,    // Means app is NOT deployed.
  inMemoryData: true,   // Means app is running in Angular development mode.
  configuration: "dev.local",   // For logging during start-up and automated testing.

  urls: {
    loginUrl: "api/login",
    proteinClassesUrl: "api/proteinClasses",
    targetUrl: "api/target-registration/",
    fastaUrl: "api/v1/absci-targets/fasta-file-parser/",
    interactionsUrl: "api/v1/absci-targets/subunit-interaction/",
    ptmsUrl: "api/v1/absci-targets/subunit-ptm/",
    plasmidsUrl: "api/plasmids",              // tslint objects to "plasmid-view" in back-end. No bother. (or use get() interceptor)
    plasmidsDetailUrl: "api/plasmidsDetail",
    targetsUrl: "api/targets",                // tslint objects to "target-view" in back-end. No bother. (or use get() interceptor)
    targetsDetailUrl: "api/targetsDetail",
    targetsPropertyUrl: "api/targetsProperty",
    plasmidSequenceDownloadUrl: "api/plasmid-sequence-download",
    currentRolesUrl: "api/currentRoles"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
