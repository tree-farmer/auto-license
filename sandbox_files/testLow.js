const request = require('/Program Files/nodejs/node_modules/request');

const uri = 'https://api.github.com/graphql';
const token = '6514ab070a2d53e6ff1e9b98c6a3184faec2142f';
const userAgent = 'tree-farmer';
const query = `organization(login: "tree-farmer") {
    repositories(first: 10) {
      totalCount
      edges {
        node {
          name
          licenseInfo {
            name
          }
        }
      }
    }
  }`

request.post({
  url: uri,
  body: query,
  json: true,
  headers: {
    'User-Agent': userAgent,
    'Authorization': 'bearer ' + token
  }
}, function (err, httpResponse, body) {
  console.log(body);
});
