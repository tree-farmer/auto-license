const Octokit = require('@octokit/rest');
const octokit = new Octokit({
  auth: 'token 6514ab070a2d53e6ff1e9b98c6a3184faec2142f',
  userAgent: 'tree-farmer'
});

const repoOwner = 'tree-farmer';
const masterRef = 'heads/master'
const newBranchRefPart = 'refs/heads/test';
const licensePath = 'LICENSE';
const pullReqMessage = 'Recommend including MIT license';
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
const pullRequestTitle = 'Add MIT license';


async function findUnlicensedRepos(repoOwner) {
  try {
    console.log('findUnlicensedRepos::params ==> repoOwner: ', repoOwner);
    const result = await octokit.repos.listForOrg({
      org: repoOwner
    });
    // console.log(result);
    const repos = result.data.filter(x => x.license === null).map(x => x.name);
    // console.log('repos: ', repos);
    return repos;
  } catch (err) {
    console.log('ERROR! ', err);
  }
}

async function addBranch(repoOwner, repoName, masterRef, newBranchRef) {
  try {
    console.log('addBranch::params ==> repoOwner: ' + repoOwner + ', repoName: ' + repoName + ', masterRef: ' + masterRef + ', newBranchRef: ' + newBranchRef);
    const result = await octokit.git.getRef({
      owner: repoOwner,
      repo: repoName,
      ref: masterRef
    });
    const sha = await result.data.object.sha;
    // console.log("sha? ", sha);

    const refRes = await octokit.git.createRef({
      owner: repoOwner,
      repo: repoName,
      // ref: 'refs/heads/test' + Date.now(),
      ref: newBranchRef,
      sha: sha
    });
    return refRes;
  } catch (err) {
    console.log('ERROR! ', err);
  }
}

// async function createLicenseFile(repoOwner, repoName, branchName, path, message, content) {
async function createLicenseFile(repoOwner, repoName, path, message, content) {
  try {
    console.log('createLicenseFile::params ==> repoOwner: ' + repoOwner + ', repoName: ' + repoName + ', path: ' + path + ', message: ' + message + ', content: ' + content);
    const createRes = await octokit.repos.createOrUpdateFile({
      owner: repoOwner,
      repo: repoName,
      // branch: branchName,
      // path: 'LICENSE',
      path: path,
      message: message,
      content: content
    });
    return createRes;
  } catch (err) {
    console.log('ERROR!', err);
  }
}

async function createPullRequest(repoOwner, repoName, pullRequestTitle, branchName, masterRef) {
  try {
    console.log('createPullRequest::params ==> repoOwner: ' + repoOwner + ', repoName: ' + repoName + ', pullRequestTitle: ' + pullRequestTitle + ', branchName: ' + branchName + ', masterRef: ' + masterRef);
    const pullRes = await octokit.pulls.create({
      owner: repoOwner,
      repo: repoName,
      title: pullRequestTitle,
      head: branchName,
      base: masterRef
    });
    return pullRes;
  } catch (err) {
    console.log('ERROR!', err);
  }
}

// Generates a psuedo-unique branch name by appending the date string
// to whatever prefix is appropriate.
function createNewBranchName(prefix) {
  console.log('createNewBranchName::params ==> prefix: ' + prefix);
  return prefix + Date.now();
}

async function main() {
  try {
    console.log('Starting');
    const result = await findUnlicensedRepos(repoOwner);
    console.log(result);
    result.forEach(repoName => {
      console.log('Add branch for ' + repoName);
      var newBranchName = createNewBranchName(newBranchRefPart);
      console.log('New branch name:', newBranchName);
      addBranch(repoOwner, repoName, masterRef, newBranchName);
      console.log('Generating license file...');
      // createLicenseFile(repoOwner, repoName, newBranchName.split('/')[2], licensePath, pullReqMessage, mitLicenseBase64);
      createLicenseFile(repoOwner, repoName, licensePath, pullReqMessage, mitLicenseBase64);
      console.log('Creating pull request...');
      createPullRequest(repoOwner, repoName, pullRequestTitle, newBranchName.split('/')[2], masterRef);
    });
    console.log('Finished');
  } catch (err) {
    console.log('ERROR in main!', err);
  }
}

main();
