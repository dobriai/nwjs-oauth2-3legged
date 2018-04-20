# nwjs-oauth2-3legged


It demonstrates one way to do a 3-legged OAuth2 with an **NW.js**-based app, **without running a server!**.

In this branch, we are using an `iframe` to host the login.

Here is a summaryApp of the action:
* Let the user authenticate themselves through the OAuth2 server (GitHub in this demo)
* Intercept the redirect call from the server - it points to `localhost:3000`, where there is nothing listening. But we never intend to get there!
* Extract the *authorization code*
* Cancel the HTTPS redirect that the `iframe` is about to start
* Hide the `iframe` - it is no longer needed

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone --branch using-iframe https://github.com/dobriai/nwjs-oauth2-3legged
# Go into the repository
cd nwjs-oauth2-3legged
# Install dependencies
npm install
# Run the app
npm start
```

Click on the link to go to the login site.

## Fine Points and Security

Some login sites, such as GitHub do not like to be `iframe`-d for security reasons - and these are **good** reasons!

In this demo, we want to override those, as we are not browsing the Wild Web, but the host frame is of our own making not something we download from somewhere, so click-jacking should not be a threat.

So, to trick the login page to open if the `iframe` we set the `nwdisable` and `nwfaketop` attributes. None of this is all that safe, it seems, but so long as you trust the login site ... should be OK, maybe. Talk to an expert!

TODO: Study the use of `<webview>` tag - it might provide better security. 

## Resetting, deleting the Cookies

After you semi-login, you may get a cookie, so the next time you run the app you will not need to log in again, at least with GitHub. If you want to see the login dialog, then you need to delete the cookie(s).

On a windows machine, the cache folder looks something like this `C:\Users\<user>\AppData\Local\nwjs-oauth2-3legged`. Wipe it. On Linux it would be ... something in your home dir - will check later :-) 
