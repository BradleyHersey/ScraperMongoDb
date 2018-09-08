const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/data");
const Headline = require("../models/Headline");
module.exports = {
    fetch: (req,res) => {
        console.log("INSIDE CONTROLLER FETCH --------------------------------")
       scrape()
       .then( (data)=> {
            console.log("inside scrape!!!!!!!!!!!!!!!!!!!! ON CONTROLLER ---------------------------------")
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
        });console.log("2");
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