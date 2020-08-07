const axios = require("axios");
const cheerio = require("cheerio");
const isRelativeUrl = require("is-relative-url");

async function getAllLinks(url) {
    try {
        let result = await axios.get(url);
        $ = cheerio.load(result.data);
        links = [];
        $("a").each((i, link) => {
            links.push(link);
        });
        return links;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function crawlPage(url) {
    let links = await getAllLinks(url);
    for (let link of links) {
        try {
            let resp = {};
            if (isRelativeUrl($(link).attr("href"))) {
                resp = await axios.get(url + $(link).attr("href"));
                if (resp.status !== 200) {
                    console.log(
                        "Broken Link: " +
                        url + $(link).attr("href") +
                        " returned status: " +
                        resp.status
                    );
                } else {
                    console.log(
                        "Valid Link: " +
                        url + $(link).attr("href") +
                        " returned status: " +
                        resp.status
                    );
                }
            } else {
                resp = await axios.get($(link).attr("href"));
                if (resp.status !== 200) {
                    console.log(
                        "Broken Link: " +
                        $(link).attr("href") +
                        " returned status: " +
                        resp.status
                    );
                } else {
                    console.log(
                        "Valid Link: " +
                        $(link).attr("href") +
                        " returned status: " +
                        resp.status
                    );
                }
            }
        } catch (err) {
            console.log("Not a valid URL: " + $(link).attr("href"));
        }
    }

}

crawlPage("https://www.chase.com/");

// crawlPage("https://tutorialedge.net");