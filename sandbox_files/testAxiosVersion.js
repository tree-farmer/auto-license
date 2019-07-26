// Require axios to perform easy promise-based POST request
const axios = require('/Program Files/nodejs/node_modules/axios');
// Define constant
// Endpoint URL
const githubUrl = 'https://api.github.com/graphql'
// Your personal access token
const token = '6514ab070a2d53e6ff1e9b98c6a3184faec2142f'
// The Authorization in the header of the request
const oauth = {Authorization: 'bearer ' + token}
// The GraphQL query, a string
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

// Post request, axios.post() return a Promise
axios.post(githubUrl, {query: query}, {headers: oauth})
  .then(function (response) {
    // On success, print the response
    console.log(response.data);
  })
  .catch(function (error) {
    // On error, print the error
    console.log(error);
  });
