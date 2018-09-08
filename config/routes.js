const request = require('request');
const cheerio = require("cheerio");
const scrape = require("../scripts/scrape");
const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

module.exports = app => {
    app.get("/", (req, res) => {
        res.render("home");
    });
    app.get("/saved", (req, res) => {
        res.render("saved");
    });
    app.get("/api/fetch", (req, res) => {
        console.log("api fetch connected ------------------------------------------")
        headlinesController.fetch((err, docs) => {
            if (!docs || docs.insertedCount == 0) {
                res.json({
                    message: "No luck today maybe TOMORROW?!"
                });
            } else {
                res.json({
                    message: "ADDED"+docs.insertedCount+" New News!!"
                });
            }
        });
    });
    app.get("/api/headlines", (req, res) => {
        let query = { saved: false };
        if (req.query.saved) {
            query = {
                saved: true
            };
        }
        console.log('query is', query)
        headlinesController.get(query, data => {
            res.json(data);
        });
    });
    app.delete("/api/headlines/:id", (req, res) => {
        let query = {};
        query._id = req.params.id;
        headlinesController.delete(query, (err, data) => {
            res.json(data);
        });
    });
    app.patch("/api/headlines", (req, res) => {
        headlinesController.update(req.body, (err, data) => {
            res.json(data);
        });
    });
    app.get("/api/notes/:headline_id?", (err, data) => {
        let query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, (err, data) => {
            res.json(data);
        });
    });
    app.post("/api/notes", (req, res) => {
        notesController.save(req.body, data => {
            res.json(data);
        });
    });
    console.log("1");
}