export const environment = {
  production: true,
  inMemoryData: false,

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
};
