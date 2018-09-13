const scrape = require("../scripts/scrape");
const makeDate = require("../scripts/data");
const Headline = require("../models/Headline");
module.exports = {
    fetch: (cb) => {
        console.log("INSIDE CONTROLLER FETCH --------------------------------")
       scrape()
       .then( (data)=> {
            console.log("inside scrape!!!!!!!!!!!!!!!!!!!! ON CONTROLLER ---------------------------------")
            let results = data;
            console.log("2\n\n\n\n\n\n\n\n\n", results);


            for (let i = 0; i < results.length; i++) {
                results[i].data = makeDate();
                results[i].saved = false;
            }
            

            Headline.collection.insertMany(results, {
                ordered: false
            }, 
            (docs) => {
                console.log('finished adding to db')
                cb(docs);
            });
        })
        .catch(error => {
            console.log('error on scrape', error)
        });console.log("2");
    },
    delete: (query, cb) => {
        Headline.remove(query, cb);console.log("delete");
    },
    
    get: (query, cb) => {
        Headline.find({}).exec((err, doc) => {
            console.log('got data',err,)
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