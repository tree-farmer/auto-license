const http = require('http');
// const axios = require('/Program Files/nodejs/node_modules/axios');
const { graphql } = require('/Program Files/nodejs/node_modules/graphql');

http.createServer((request, response) => {
  const {
    headers,
    method,
    url
  } = request;
  let body = [];
  var resultString = '';

  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    // body.push(chunk);
    // TODO: Do I care if data is sent? Probably not, so ignore...
  }).on('end', () => {
    // body = Buffer.concat(body).toString();
    // TODO: Not sure if anything should be done here

    // Require axios to perform easy promise-based POST request

    // Define constant
    // Endpoint URL
    // const githubUrl = 'https://api.github.com/graphql'
    // Your personal access token
    const token = '6514ab070a2d53e6ff1e9b98c6a3184faec2142f'
    // The Authorization in the header of the request
    // const oauth = {Authorization: 'bearer ' + token}
    // The GraphQL query, a string
      // const query = '{' +
      //                 'repositoryOwner(login: "dirid51") { ' +
      //                   '... on User {' +
      //                     'repositories(first: 6) {' +
      //                       'edges {' +
      //                         'node {' +
      //                           'name,' +
      //                           'description,' +
      //                           'url' +
      //                           '}' +
      //                         '}' +
      //                       '}' +
      //                     '}' +
      //                   '}' +
      //                 '}'

    
    // Post request, axios.post() return a Promise
    // axios.post(githubUrl, {query: query}, {headers: oauth})
    //   .then(function (apiResponse) {
    //     // On success, print the response
    //     // body = apiResponse.data;
    //     resultString += apiResponse;
    //     // console.log(apiResponse.data);
    //   })
    //   .catch(function (error) {
    //     // On error, print the error
    //     resultString += error;
    //     console.log(error);
    //   });

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

    query().then(
      res => resultString = JSON.stringify(res, null, 2),
      err => console.error(err)
    );

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = {
      headers,
      method,
      url,
      body
    };

    response.write(JSON.stringify(resultString));
    // response.write(JSON.stringify(body));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))
  });
}).listen(8080);
