const express = require("express");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8081;
const app = express();

const colors = {
   main: (text) => {
      console.log(chalk.cyan(text));
   },
};

let randomNum = Math.floor(Math.random() * 26); // random number 0-25
let guesses = {
   connor: [],
   collin: [],
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.post("/sendGuesses", (req, res) => {
   const { connor, collin } = req.body; // object destructuring

   colors.main(`RANDOM NUM: ${randomNum}`);
   colors.main(`Connor: ${connor} - Collin: ${collin}`);

   guesses.connor.push(connor);
   guesses.collin.push(collin);

   res.json({ randomNum: randomNum, guesses });
});

app.get("/reset", (req, res) => {
   colors.main(`\nRESETTING GAME\n`);

   randomNum = Math.floor(Math.random() * 26);
   guesses = {
      connor: [],
      collin: [],
   };

   res.json({ randomNum: randomNum, guesses });
});

app.listen(PORT, () => {
   colors.main(`\nServer running on port: ${PORT}\n`);
});
