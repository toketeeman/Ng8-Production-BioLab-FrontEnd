// The urls here are the mock paths to in-memory mock data.
// The urls must be formed as aritrary relative urls with the
// requirement that the last segment must match the data name used
// inside createDb() for the corresponding data within in-memory-data.service.ts .

// The app is built and served in this operating mode with the command:
//
//   >ng serve --configuration=dev.local
//
// OR more simply by
//
//   >ng serve
//
// since it is also the default operating mode.

export const environment = {
  production: false,    // Means app is NOT deployed.
  inMemoryData: true,   // Means app is running in Angular development mode.

  urls: {
    loginUrl: "api/login",
    proteinClassesUrl: "api/proteinClasses",
    targetUrl: "api/target-registration/",
    fastaUrl: "api/v1/absci-targets/fasta-file-parser/",
    interactionsUrl: "api/v1/absci-targets/subunit-interaction/",
    ptmsUrl: "api/v1/absci-targets/subunit-ptm/",
    plasmidsUrl: "api/plasmids",
    plasmidsDetailUrl: "api/plasmidsDetail",
    targetsUrl: "api/targets",
    targetsDetailUrl: "api/targetsDetail"
  }
};
