let config = {};
config.apiUrl = "http://localhost:4111";
// config.grafana={
//     host: "http://localhost:3000",
//     path:"/d/pfqYrSTWz/developer-dashboard?orgId=1&refresh=5s&var-dappId="
// }
config.grafana={
    host: "http://grafana.biconomy.io",
    path:"/d/7bhWE-0Zz/developer-dashboard?orgId=1&refresh=5s&var-dappId="
}
module.exports = config;
