// The urls here are the true absolute paths to backend data sources for
// direct testing purposes in development.

// The app is built and served in this operating mode with this command:
//
//   >ng serve --configuration=dev.remote
//

export const environment = {
  production: false,
  inMemoryData: false,

  urls: {
    loginUrl: "https://ptdb-dev.intranet.absci.com/api/v1/auth/login/",
    proteinClassesUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/protein-class/",
    targetUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/target-registration/",
    fastaUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/fasta-file-parser/",
    interactionsUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/subunit-interaction/",
    ptmsUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/subunit-ptm/",
    plasmidsUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/plasmid-view/",
    plasmidsDetailUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/plasmid-detail-view/",
    targetsUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/target/",
    targetsDetailUrl: "https://ptdb-dev.intranet.absci.com/api/v1/absci-targets/target-detail-view/"
  }
};
