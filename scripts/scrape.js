const request = require("request");
const axios = require('axios')
const cheerio = require("cheerio");
const scrape = ()=> {
    return axios.get('https://www.animenewsnetwork.com/').then((res) => {

        const $ = cheerio.load(res.data);
        let results = [];
        $(".wrap").each(function(i, element) {
          //console.log('im in the function')
      //     var headline = $(this)
      //  .find("h3 t-explicit")
      //  .text()
      //  .trim();
      //console.log($(this).find("div").html());

           const headline = $(this).find("div h3 a").text().trim();
           const summary = $(this).find("div .preview .full ").text();
           
           const url = $(this).find("a") .attr("href");

            if (headline&&summary) {
                const headlineNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, "").trim();
                const summaryNeat = summary;
                const dataToAdd = {
                    headline: headlineNeat,
                    summary: summaryNeat
                    //url: "https://www.animenewsnetwork.com/" + url
                };
                results.push(dataToAdd);
            }
           
        });
       // console.log("RESULTS------------------", results)
        return results;    
    });


};
// var axios = require("axios");
// var cheerio = require("cheerio");

// // This function will scrape the NYTimes website
// var scrape = function() {
//   // Scrape the NYTimes website
//   return axios.get("http://www.nytimes.com").then(function(res) {
//     var $ = cheerio.load(res.data);
//     // Make an empty array to save our article info
//     var articles = [];

//     // Now, find and loop through each element that has the "css-180b3ld" class
//     // (i.e, the section holding the articles)
//     $("article.css-180b3ld").each(function(i, element) {
//       // In each article section, we grab the child with the class story-heading

//       // Then we grab the inner text of the this element and store it
//       // to the head variable. This is the article headline
//       var head = $(this)
//         .find("h2")
//         .text()
//         .trim();

//       // Grab the URL of the article
//       var url = $(this)
//         .find("a")
//         .attr("href");

//       // Then we grab any children with the class of summary and then grab it's inner text
//       // We store this to the sum variable. This is the article summary
//       var sum = $(this)
//         .find("p")
//         .text()
//         .trim();

//       // So long as our headline and sum and url aren't empty or undefined, do the following
//       if (head && sum && url) {
//         // This section uses regular expressions and the trim function to tidy our headlines and summaries
//         // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
//         var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
//         var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

//         // Initialize an object we will push to the articles array

//         var dataToAdd = {
//           headline: headNeat,
//           summary: sumNeat,
//           url: "https://www.nytimes.com" + url
//         };

//         articles.push(dataToAdd);
//       }
//     });
//     return articles;
//   });
// }
 module.exports = scrape;

//console.log("SCRAPED DATA: ", $)