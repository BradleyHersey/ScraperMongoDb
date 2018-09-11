const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    data: String,
    noteText: String
});
console.log("5");
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;