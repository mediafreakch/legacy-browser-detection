// Browser Detection Module 
// ------------------------
// A derivative work by mediafreakch based on http://browser-update.org/
// Project Github page: https://github.com/mediafreakch/browserdetection

var browserDetection = (function () {
    var browser, os;

    // get the browser details
    var getBrowser = function() {
        var n, v, ua = navigator.userAgent;
        var names = {
            i: 'Internet Explorer',
            f: 'Firefox',
            o: 'Opera',
            s: 'Apple Safari',
            n: 'Netscape Navigator',
            c: 'Chrome',
            x: 'Other'
        };

        if (/bot|googlebot|slurp|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n = "x";
        else if (/Trident.(\d+\.\d+)/i.test(ua)) n = 'io';
        else if (/MSIE.(\d+\.\d+)/i.test(ua)) n = 'i';
        else if (/Chrome.(\d+\.\d+)/i.test(ua)) n = 'c';
        else if (/Firefox.(\d+\.\d+)/i.test(ua)) n = 'f';
        else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua)) n = 's';
        else if (/Safari.(\d+)/i.test(ua)) n = 'so';
        else if (/Opera.*Version.(\d+\.?\d+)/i.test(ua)) n = 'o';
        else if (/Opera.(\d+\.?\d+)/i.test(ua)) n = 'o';
        else if (/Netscape.(\d+)/i.test(ua)) n = 'n';
        else
            return {
                n: 'x',
                v: 0,
                t: names[n]
            };

        if (n == 'x')
            return {
                n: 'x',
                v: 0,
                t: names[n]
            };

        v = Number(RegExp.$1);

        if (n == 'so') {
            v = ((v < 100) && 1.0) || ((v < 130) && 1.2) || ((v < 320) && 1.3) || ((v < 520) && 2.0) || ((v < 524) && 3.0) || ((v < 526) && 3.2) || 4.0;
            n = 's';
        }

        if (n == 'i' && v == 7 && window.XDomainRequest) {
            v = 8;
        }

        if (n == 'io') {
            n = 'i';
            if (v > 5) v = 10;
            else if (v > 4) v = 9;
            else if (v > 3.1) v = 8;
            else if (v > 3) v = 7;
            else v = 9;
        }

        return {
            n: n,
            v: v,
            t: names[n] + ' ' + v,
            name: names[n]
        };
    };

    browser = getBrowser();

    // get the OS
    var getOS = function() {
        var av = navigator.appVersion,
            os;

        if (av.indexOf("Win") != -1) os = 'Windows';
        else if (av.indexOf("Mac") != -1) os = 'Mac';
        else if (av.indexOf("X11") != -1) os = 'Unix';
        else if (av.indexOf("Linux") != -1) os = 'Linux';
        else os = "Unknown OS";
        return os;
    };

    os = getOS();

    // define a submodule that contains the logic to handle legacy browsers
    var Utils = (function(browser, os) {
        var LEGACYVERSIONS = {
            i: 9,
            f: 4,
            o: 11,
            s: 4,
            n: 10
        },
            COOKIENAME = "browserDetected=1";

        var isLegacyBrowser = function(config) {
            var config = config || LEGACYVERSIONS;

            return (browser.n == 'x' || browser.n == 'c' || browser.v > config[browser.n]) ? false : true;
        };

        var runDetection = function(config, fn) {
            var legacyBrowsers = (config.legacyBrowsers ? config.legacyBrowsers : LEGACYVERSIONS);

            if ((!isLegacyBrowser(legacyBrowsers) || document.cookie.indexOf(COOKIENAME) > -1) && !config.debug)
                return;

            if (config.rememberUser) {
                setReminderCookie(config.reminderInterval || 0);
            }

            // execute callback if provided
            if (typeof(fn) === 'function')
                fn(os, browser.name, browser.v);
        };

        var setReminderCookie = function(intv) {
            var exp;

            if (intv && intv > 0)
                exp = ';expires=' + new Date(new Date().getTime() + 1000 * 3600 * 24 * intv).toUTCString();
            else
                exp = '';

            document.cookie = COOKIENAME + ';path=/' + exp;
        };

        // the facade for the submodule
        return {
            COOKIENAME: COOKIENAME,
            isLegacy: isLegacyBrowser,
            LEGACYVERSIONS: LEGACYVERSIONS,
            notify: runDetection,
            setReminder: setReminderCookie
        };
    }(browser, os));

    // the facade for the core module
    return {
        Utils: Utils,
        getBrowser: function() {
            return browser.t;
        },
        getBrowserName: function() {
            return browser.name;
        },
        getBrowserVersion: function() {
            return browser.v;
        },
        getOS: function() {
            return os;
        }
    };
}())
