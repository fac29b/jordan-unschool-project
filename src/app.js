const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const server_port = process.env.PORT || 3001;

const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "ejs");
app.set("views", path.join(viewsPath));

app.use("/public", express.static(public));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const gptHandler = require('./routes/gptHandler')

//routes
app.use(gptHandler);

app.listen(server_port, () => {
  console.log(`App running at port ${server_port}`);
});
