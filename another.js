const blc = require('broken-link-checker');

module.exports = {
    async verifyHrefStatus(url) {
        var options = {
            acceptedSchemes: ["http", "https"],
            cacheExpiryTime: 3600000,
            filterLevel: 1,
            honorRobotExclusions: true,
            requestMethod: "head", // "head", "get"
            retry405Head: true,
            userAgent: "broken-link-checker/0.7.0 Node.js/5.5.0 (OS X El Capitan; x64)"
        };
        await new Promise((resolve, reject) => {
            var siteChecker = new blc.SiteChecker(options, {
                robots: function (robots, customData) { },
                html: function (tree, robots, response, pageUrl, customData) { }, // html is fired after a page's HTML document has been fully parsed
                junk: function (result, customData) { //junk is fired with data on each skipped link, as configured in options
                    if (result.broken && blc[result.brokenReason] === "Not Found (404)") {
                        console.log("Broken link: " + result.url.original)
                        // expect(blc[result.brokenReason]).to.be.equal("200", "Broken link: " + result.url.original);
                    }
                },
                link: function (result, customData) { // link is fired with the result of each discovered link (broken or not) within the current page
                    if (result.broken && blc[result.brokenReason] === "Not Found (404)") {
                        console.log("Broken link: " + result.url.original)
                        // expect(blc[result.brokenReason]).to.be.equal("200", "Broken link: " + result.url.original);
                    }
                },
                page: function (error, pageUrl, customData) { },
                site: function (error, siteUrl, customData) { },
                end: function () { // end is fired when the end of the queue has been reached
                    resolve();
                    console.log("--------- Completed -----------");
                }
            });
            siteChecker.enqueue(url);
        });
    }
}
