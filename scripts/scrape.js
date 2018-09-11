const request = require("request");
const cheerio = require("cheerio");
const scrape = cd => {
    request('https://www.animenewsnetwork.com/', (err, res, body) => {
        const $ = cheerio.load(body);
        let results = [];
        $(".herald box reviews").each((i, element) => {
            let title = $(this).children("h3 t-explicit").text().trim();
            let story = $(this).children(".intro").text().trim();
console.log(body);
            if (title && story) {
                const titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                const storyNeat = story.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                const dataAdd = {
                    headline: titleNeat,
                    summary: storyNeat
                };
                results.push(dataAdd);
            }
        });
        cb(results);
    });


};console.log("9");
module.exports = scrape;

//console.log("SCRAPED DATA: ", $)