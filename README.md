# auto-license
### What is it? What does it do? Why? ###
**Checks all public and private Github repos in an organization for a license. If none exists, one is added.**

# Assessment project by Randall Booth #

Requirements to Run:
1. Install Node.js ([nodejs.org](https://nodejs.org/en/)). I developed this against version 12.7.0.
2. Install the @octokit/rest module: ```npm install @octokit/rest --save```

Assumptions:
1. I assume that Node.js is not OS-specific. I developed this code on a Windows machine, but I assume that it can be executed on a Linux or Mac box as well.
2. I assume that the user has an internet connection that can access developer.github.com/v3.
3. I assume that Node.js is installed and that my code is compatible with your version.

Written in Node.js (i.e., Javascript). The file auto-license.js is the main file for this project, but I have added some of my scratch paper files, i.e. sandbox files - files just for learning and figuring things out. Maybe they will turn out helpful. I have uploaded a couple of my Go files to another repo: auto-license-go. This is my first node.js project and I have learned a lot. At first, I thought that I should use Kotlin, since it is supposed to be fairly easy for Java developers to pick up. But after a bit, I switched to Node.js. Not because it was easier to pickup, despite having used Javascript fairly extensively, but because I came across a GraphQL (which was new to me, too) library for Node.js that I thought would make pulling data from Github's API v4 fairly simple. Well, that wasn't the case or I was up too late at night or something. At any rate, I soon dropped it for a swing at the project with Go and GraphQL. That was pretty neat, as it was my first exposure to Go. I made some headway in just learning how to use Go. But I was running up against some issues trying to get the data I needed. Eventually, I came across a Node.js module made by Github for the purpose of pulling data from Github's API v3. With that, I was back into Node.js, giving it all I had. I have to say that Javascript has changed quite a bit since 2004, when I first started using it. Some of the functional and asynchronous stuff still gives me trouble, as you will see in my code. But I sure had a fun time! There is something about the async/await commands that I apparently don't fully understand yet, because I could get it to work perfectly and as I expected it to, then after a few more additions to the code I would start getting errors saying that I could only use 'await' on code that had been async'd, which I had already done. Anyway, besides the code, there appears to be something about the way that Github(:octocat:) integrates file creation and creating a new branch in the repo that I don't get either. I probably just missed it in the API documentation.
