const Note = require("../models/Note");
const makeDate = require("../scripts/data");
module.exports = {
    get: (data, cb) => {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    save: (data, cb) => {
        const newNote = {
            _headlineId: data._id,
            data: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });console.log("3");
    },
    delete: (data, cb) => {
        Note.remove({
            _id: data._id
        }, cb);
    }
};