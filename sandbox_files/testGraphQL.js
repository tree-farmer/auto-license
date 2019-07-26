const graphql = require('/Program Files/nodejs/node_modules/graphql.js');

const graph = graphql('https://api.github.com/graphql');

const query = graph(`organization(login: "tree-farmer") {
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
}`, {
  headers: {
    authorization: `token 6514ab070a2d53e6ff1e9b98c6a3184faec2142f`
  }
});

if (require.main === module) {
  query().then(
    res => console.log(JSON.stringify(res, null, 2)),
    err => console.error(err)
  );
}

module.exports = {
  query
};
