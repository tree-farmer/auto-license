const { createApolloFetch } = require('/Program Files/nodejs/node_modules/apollo-fetch');

const fetch = createApolloFetch({
  uri: 'https://api.github.com/graphql',
});

const query = `query organization(login: "tree-farmer") {
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
  }`;

  fetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};  // Create the headers object if needed.
  }
  options.headers['authorization'] = 'token 6514ab070a2d53e6ff1e9b98c6a3184faec2142f';

  next();
});

fetch(query).then(res => {
  console.log(res.data);
});
