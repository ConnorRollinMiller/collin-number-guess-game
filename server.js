const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8081;
const app = express();

const colors = {
   main: (text) => {
      console.log(chalk.cyan(text));
   }
}

app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.static('client')); // serve static files - give any directory in project 

app.post('/sendGuesses', (req, res) => {
   const { connor, collin } = req.body; // object destructuring

   // const randomNum = Math.floor(Math.random() * 26) // random number 0-25/

   colors.main('RANDOM NUM:',randomNum)
   colors.main(`Connor: ${connor} - Collin: ${collin}`);

   res.json({ collin: req.body.connor == randomNum, connor: req.body.collin == randomNum, randomNum: randomNum });
});

app.listen(PORT, () => {
   colors.main(`\nServer running on port: ${PORT}\n`);
});