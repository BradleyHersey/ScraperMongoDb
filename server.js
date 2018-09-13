// dependencies
const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
//port 
const PORT = process.env.PORT ||3335;
//express app
const app = express();
// express router
const router = express.Router();
require("./config/routes")(router);
// public folder as a static directory
//  app.use(express.static("/public/assets/javascript/index.js"));
// app.use(express.static(`/public${__dirname}`));
app.use(express.static('public'));
//connect handlebars to express
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
//body Parser 
app.use(bodyParser.urlencoded({
    extended: false
}))
//request go through our router middleware
app.use(router);
//use database or local
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// logs errors 
mongoose.connect(db, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("You are connected to mongoose Dude!!!")
    }
});



require('./config/routes')(app)


//listen on the port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});