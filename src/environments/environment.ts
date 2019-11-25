// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  inMemoryData: true,

  urls: {
    loginUrl: "api/v1/auth/login/",
    proteinClassesUrl: "api/v1/absci-targets/protein-class/",
    targetUrl: "api/v1/absci-targets/target-registration/",
    fastaUrl: "api/v1/absci-targets/fasta-file-parser/",
    interactionsUrl: "api/v1/absci-targets/subunit-interaction/",
    ptmsUrl: "api/v1/absci-targets/subunit-ptm/",
    plasmidsUrl: "api/v1/absci-targets/plasmid-view/",
    plasmidsDetailUrl: "api/v1/absci-targets/plasmid-detail-view/",
    targetsUrl: "api/v1/absci-targets/target/",
    targetsDetailUrl: "api/v1/absci-targets/target-detail-view/"
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
