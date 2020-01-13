// The urls here are the true absolute paths to Docker data sources for
// direct sandbox testing purposes in development.

// The app is built and served in this operating mode with this command:
//
//   >ng serve --configuration=dev.docker
//

export const environment = {
  production: false,    // Means app is NOT deployed.
  inMemoryData: false,  // Means app is running in Angular production mode.

  urls: {
    loginUrl: "http://localhost:8000/api/v1/auth/login/",
    proteinClassesUrl: "http://localhost:8000/api/v1/absci-targets/protein-class/",
    targetUrl: "http://localhost:8000/api/v1/absci-targets/target-registration/",
    fastaUrl: "http://localhost:8000/api/v1/absci-targets/fasta-file-parser/",
    interactionsUrl: "http://localhost:8000/api/v1/absci-targets/subunit-interaction/",
    ptmsUrl: "http://localhost:8000/api/v1/absci-targets/subunit-ptm/",
    plasmidsUrl: "http://localhost:8000/api/v1/absci-targets/plasmid-view",
    plasmidsDetailUrl: "http://localhost:8000/api/v1/absci-targets/plasmid-detail-view",
    targetsUrl: "http://localhost:8000/api/v1/absci-targets/target-view/",
    targetsDetailUrl: "http://localhost:8000/api/v1/absci-targets/target-detail-view",
    targetsPropertyUrl: "http://localhost:8000/api/v1/absci-targets/target-biophysical-properties-view/",
    plasmidSequenceDownloadUrl: "http://localhost:8000/api/v1/absci-targets/plasmid-sequence-download",
    currentRolesUrl: "http://localhost:8000/api/v1/absci-targets/current-roles/"
  }
};
