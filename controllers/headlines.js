const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/data");
const Headline = require("../models/Headline");
module.exports = {
    fetch: (cb) => {
        console.log("INSIDE CONTROLLER FETCH --------------------------------")
       scrape()
       .then( (data)=> {
            console.log("inside scrape!!!!!!!!!!!!!!!!!!!! ON CONTROLLER ---------------------------------")
            const results = data;
            for (let i = 0; i < results.lenght; ++i) {
                results[i].data = makeDate();
                results[i].saved = false;
            }console.log("2");
            Headline.collection.insertMany(results, {
                ordered: false
            }, 
            (docs) => {
                cb(docs);
            });
        });
    },
    delete: (query, cb) => {
        Headline.remove(query, cb);console.log("delete");
    },
    
    get: (query, cb) => {
        Headline.find({saved: null}).sort({
            _id: -1
        }).exec((err, doc) => {
            console.log('got data')
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