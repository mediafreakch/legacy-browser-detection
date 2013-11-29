# About

This is a lightweight js module that u can use to detect the browser a user uses as well as the operating system he works on. Browsers currently beeing recognised are:

- Chrome
- Firefox
- Internet Explorer
- Safari
- Opera
- Netscape Navigator

Operating systems currently beeing recognised include:

- Windows
- Mac
- Unix
- Linux

# Usage

Embed browserdetection.js in the head of your html page. The following methods will be available immediately on an object named `browserDetection`:

## Methods

- __getBrowser()__ *returns String*

   Returns the browser's name + version

- __getBrowserName()__ *returns String*

   Returns the browser's name

- __getBrowserVersion()__ *returns Number*

   Returns the browser's version number

- __getOS()__ *returns String*

   Returns the user's operating system as a string

## Utils

Utils is an object that provides additional tools to handle different browsers. The following methods can be used on the ```browserDetection.Utils``` object:

- __setReminder([interval])__ void

Allows you to manually set a cookie for a) the session if no interval is passed or b) for the amount of days passed. The notification won't be triggered again, until the cookie expires. This can be handy for example if you want to always show a notification, except for certain browser- or OS-versions.


- __isLegacy([browsers])__ *returns Boolean*

   _Arguments: object containing the browsers that you consider as old_ (optional)

- __notify(config, fn)__

   _Arguments: a config object, a function acting as callback_
   
   The first one is an object containing some settings described in detail below.
   
   - ```legacyBrowsers : { i: 9, f: 4, o: 11, s: 4, n: 10 } ```
   
      object containing the versions you consider as old. If omitted, defaults will be taken
   - ```rememberUser : true || false ```
   
      boolean . If true, a cookie will be set. If false, no cookie will be set
   - ```rememberInterval : 7 ```
   
      number . The amount of days after the user should be remembered again
   - ```debug : true || false ```
   
      boolean . Allows you to test the notification even if browsing with a non-legacy browser
   
   The second one is a function (optional) that will be executed once a legacy browser is beeing detected
   
   - ```function(os, browsername, browserversion) {} ```
   
      A function that will be executed when a legacy browser is detected. Operating system, Browsername and Browserversion will be passed as arguments

### Default legacy versions

The following browsers will be considered old by default if you do not provide any versions as an argument:

- Internet Explorer: 	9
- Firefox: 	4
- Opera: 	11
- Safari: 	4
- Netscape Navigator: 	10

# Examples

## 1. Get browser details
```javascript
// get the name + version
var result = browserDetection.getBrowser();
console.log(result); // returns "Chrome 21"

// get just the version
var result = browserDetection.getBrowserVersion();
console.log(result); // returns "15"
```

## 2. Deal with legacy browsers
```javascript
// check if the current used browser is a legacy browser
var browsers = { i: 8, s: 3 }
var result = browserDetection.isLegacy(browsers);
console.log(result); // returns "true" or "false"

// display notification for legacy browsers
browserDetection.Utils.notify({
	'legacyBrowsers' : { i: 9, f: 4, o: 11, s: 4, n: 10 },
	'rememberUser' : true,
	'rememberInterval' : 7,
	'debug' : true
}, function (os, browsername, browserversion) {
	alert('You are using an old browser. Please update: ' + browsername + ' ' + browserversion);
});
```
