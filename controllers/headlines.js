const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/data");
const Headline = require("../models/Headline");
module.exports = {
    fetch: cb => {
        scrape(data => {
            const results = data;
            for (let i = 0; i < results.lenght; ++i) {
                results[i].data = makeDate();
                results[i].saved = false;
            }
            Headline.collection.insertMany(results, {
                ordered: false
            }, (err, docs) => {
                cb(err, docs);
            });
        });
    },
    delete: (query, cb) => {
        Headline.remove(query, cb);
    },
    get: (query, cb) => {
        Headline.find(query).sort({
            _id: -1
        }).exec((err, doc) => {
            cb(doc);
        });
    },
    update: (query, cb) => {
        Headline.update({
            _id: query._id
        }, {
            $set: query
        }, {}, cb);
    }

}