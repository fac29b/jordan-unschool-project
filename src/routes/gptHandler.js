const express = require("express");
const router = new express.Router();
const { OpenAI } = require("openai");
// const fetch = require("node-fetch");
const multer = require("multer");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

router.get("/gpt-form", (req, res) => {
  res.render("home");
});

//preferred syntax
router.post("/gpt-form", multer().none(), async (req, res, next) => {
  if (req.body.userInput === undefined && req.body.userInput.length === 0) {
    res.status(404).json({ message: "Cannot Post Data" });
    return;
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.userInput }],
      temperature: 0.5,
      max_tokens: 2048,
    });
    let data = [
      {
        message: response.choices[0].message.content,
        role: response.choices[0].message.role,
      },
    ];
    return res.status(200).render("home", { data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  //receieve and parse incoming request data
  // console.log(!req.body.userInput || req.body.userInput.length !== 0);
  // if (req.body.userInput === undefined && req.body.userInput.length === 0) {
  //   res.status(404).send("Cannot Post Data");
  //   return;
  // }
  // //send fetch request to openAI
  // try {
  //   const response = await fetch(
  //     "https://api.openai.com/v1/chat/completions",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.OPENAI_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         messages: [{role: 'user', content: req.body.userInput}],
  //         temperature: 0.5,
  //         max_tokens: 2048
  //       }),
  //     }
  //   );
  //   //error handle the promise
  //   if (!response.ok) {
  //     throw new Error(`Error: ${response.status}`);
  //   }
  //   //render the page with new data
  //   const data = await response.json();
  //   return res.status(200).json(data.choices[0].message.content);
  //   //catch any internal server/networking errors
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
});

module.exports = router;
