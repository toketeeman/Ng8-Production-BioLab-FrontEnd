// The urls here are the true relative paths using in various levels of
// staging and production to backend data sources for deployment to users.

// The app is built and served in this operating mode with the command:
//
//   >ng serve --configuration=production
//

export const environment = {
  production: true,     // Means app is deployed.
  inMemoryData: false,  // Means app is running in Angular production mode.

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
