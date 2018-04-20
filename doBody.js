// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require('dotenv').config();
// const path = require('path');
// const url = require('url');

window.onload = () => {
};

const authURL = 'https://github.com/login/oauth/authorize';
const client_id = '32ab2284d2b46af944c6';
const redirect_uri = 'http://localhost:3000/login/github/return&state=';
const state = '64b8ebf5d66c'; // random state
const fullAuthURL = `${authURL}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;

const iframe = document.createElement('iframe');
const html = `<a href='${fullAuthURL}'>Login with ${authURL}</a>`;
iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
iframe.width = 500;
iframe.height = 400;
iframe.setAttribute('nwdisable', '');
iframe.setAttribute('nwfaketop', '');
document.body.appendChild(iframe);

// ----------------------------------------------------------------------
chrome.webRequest.onBeforeRequest.addListener(details => {
  console.log("Redirecting: " + details.url);

  const accessToken = details.url.match(/code=([^&]+)/)[1];

  iframe.style.display = 'none';
  const tN = document.createTextNode('Access token is:' + accessToken);
  document.body.appendChild(tN);

  return { cancel: true };
//   const redirectUrl = url.format({
//     pathname: path.join(nw.__dirname, 'got_access_token.html'),
//     protocol: 'file:',
//     slashes: true
//   });
//   return { redirectUrl };
},
  { urls: ['*://*.localhost:*/*'] },
  ['blocking']
);

// Turns out this is not needed!
//
// chrome.webRequest.onHeadersReceived.addListener(details => {
//   const responseHeaders = details.responseHeaders.reduce((acc, curr) => {
//     if (curr.name !== 'X-Frame-Options') {
//       acc.push(curr);
//     }
//     else {
//       console.log('Dropping X-Frame-Options from: ' + details.url);
//     }
//     return acc;
//   }, []);
//   return { responseHeaders };
// },
//   { urls: ['<all_urls>'] },
//   ['blocking', 'responseHeaders']
// );
