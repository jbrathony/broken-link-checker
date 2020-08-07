const blc = require('broken-link-checker');

var options = {
    acceptedSchemes: ["http", "https"],
    cacheExpiryTime: 3600000,
    filterLevel: 1,
    honorRobotExclusions: true,
    requestMethod: "head", // "get"
    retry405Head: true,
    userAgent: "broken-link-checker/0.7.0 Node.js/5.5.0 (OS X El Capitan; x64)"
};

var siteChecker = new blc.SiteChecker(options, {
    robots: function (robots, customData) {
        console.log('---------robots------')
    },
    html: function (tree, robots, response, pageUrl, customData) {
        console.log('---------html-----')
    },
    junk: function (result, customData) {
        // console.log('---------junk------')

        // if (result.broken) {
        //     console.log('Broken Url--' + result.url.original + ' Reason--' + blc[result.brokenReason]);
        // } else if (result.excluded) {
        //     console.log('excluded Url--' + result.url.original + ' excludedReason--' + blc[result.excludedReason]);
        // }

        if (result.broken) {
            console.log('broken link ===> ', result.url.original);
        }
    },
    link: function (result, customData) {
        // console.log('---------link----')

        // if (result.broken) {
        //     console.log('broken link ---', result)
        //     console.log(blc[result.brokenReason]);
        // } else if (result.excluded) {
        //     console.log('excluded link ---', result)
        //     console.log(blc[result.excludedReason]);
        // }

        if (result.broken) {
            console.log('broken link ===> ', result.url.original);
        }
    },
    page: function (error, pageUrl, customData) {
        // console.log('---------page----', pageUrl)

        // if (error) {
        //     console.log('Page error--', error);
        // }
        // if (pageUrl) {
        //     console.log('Page url--', pageUrl);
        // }
    },
    site: function (error, siteUrl, customData) {
        // console.log('---------site----')

        // if (error) {
        //     console.log('site error--', error);
        // }
        // if (siteUrl) {
        //     console.log('site url--', siteUrl);
        // }
    },
    end: function () {
        console.log('---------end-----------')
    }
});
var url = 'https://www.chase.com/';

siteChecker.enqueue(url);
