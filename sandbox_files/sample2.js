const Octokit = require('@octokit/rest');
const octokit = new Octokit({
  auth: 'token 6514ab070a2d53e6ff1e9b98c6a3184faec2142f',
  userAgent: 'tree-farmer'
});
const owner = 'tree-farmer';
const branchName = 'tree-farmer-patch-1';
const ref = 'heads/master';
const message = 'Recommend including MIT license';
const mitLicenseBase64 = 'TUlUIExpY2Vuc2UKCkNvcHlyaWdodCAoYykgMjAxOSBSYW5kYWxs' +
  'IEJvb3RoCgpQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gY' +
  'W55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5Cm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZW' +
  'QgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICJTb2Z0d2FyZSIpLCB0byBkZWFsCmluIHRoZSBTb2Z' +
  '0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRo' +
  'ZSByaWdodHMKdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlL' +
  'CBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbApjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcG' +
  'VybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMKZnVybmlzaGVkIHRvIGRvIHNvLCB' +
  'zdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczoKClRoZSBhYm92ZSBjb3B5cmlnaHQg' +
  'bm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsb' +
  'Apjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLgoKVEhFIFNPRl' +
  'RXQVJFIElTIFBST1ZJREVEICJBUyBJUyIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEV' +
  'YUFJFU1MgT1IKSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFO' +
  'VElFUyBPRiBNRVJDSEFOVEFCSUxJVFksCkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFI' +
  'EFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRQpBVVRIT1JTIE9SIENPUF' +
  'lSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSCkx' +
  'JQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJX' +
  'SVNFLCBBUklTSU5HIEZST00sCk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQ' +
  'VJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFClNPRlRXQVJFLg==';

octokit.repos.listForOrg({
  org: owner
}).then(({
  data
}) => {
  // handle data
  let repoNamesWithoutLicense = data.filter(x => x.license === null) //keep if no license
    .map(x => x.name); //just need repo names
  console.log(repoNamesWithoutLicense);
  console.log('Found ' + repoNamesWithoutLicense.length + ' repos that do not have a license.');
  repoNamesWithoutLicense.forEach(function(repoName) {
    var sha;
    console.log('Getting reference...', owner, repoName, ref);
    // octokit.git.getRef({
      // owner: owner,
      // repo: repoName,
      // ref: ref
      octokit.git.listRefs({
        owner: owner,
        repo: repoName
    }).then(({
      refJsonData
    }) => {
      console.log('refJsonData: ', refJsonData);
      let refData = JSON.parse(refJsonData);
      sha = refData.object.sha;
      console.log('sha: ', sha);
      octokit.git.createRef({
        owner: owner,
        repo: repoName,
        ref: 'heads/' + branchName,
        sha: sha
      }).catch(function(err) {
        console.log('error: ', err);
      })
      console.log('Branch created: [repo: ' +  repoName + '] [branch: ' + branchName + ']');
    }).catch(function(err) {
      console.log('error: ', err);
    });

    console.log(`Creating license file: [owner:${owner}] [repo:${repoName}] [message:${message}]`);
    octokit.repos.createOrUpdateFile({
        owner: owner,
        repo: repoName,
        branch: branchName,
        path: 'LICENSE',
        message: message,
        content: mitLicenseBase64
      })
      .catch(function(err) {
        console.log('error: ', err);
      });

    console.log('License file created.');
    console.log('Generating pull request...');
    octokit.pulls.create({
        owner: owner,
        repo: repoName,
        title: 'Add MIT license',
        head: branchName,
        base: 'master'
      })
      .catch(function(err) {
        console.log('error: ', err);
      });
    console.log('Pull request completed.');
  });
}).catch(function(err) {
  console.log('error: ', err);
});
