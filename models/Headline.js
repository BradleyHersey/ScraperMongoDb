const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    url:{
        type:String,
        required:true
    },
    data: String,
    saved: {
        type: Boolean,
        default: false
    }
});
console.log("4");
const Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;