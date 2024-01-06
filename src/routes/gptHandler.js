const express = require("express");
const multer = require('multer')
const router = new express.Router();

router.get("/gpt-form", (req, res) => {
  res.render("home");
});

router.post("/gpt-form", multer().none(), (req, res, next) => {
    //receieve and parse incoming request data
    if(!req.body.userInput|| req.body.userInput.length === 0) {
        res.status(404).send('Cannot Post Data');
        next();
    }
    //send fetch request to openAI

    //error handle the promise

    //render the page with new data
});

module.exports = router;
