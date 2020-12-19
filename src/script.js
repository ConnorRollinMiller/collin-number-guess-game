import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

$(document).ready(() => {
   // keeps track of rounds
   let roundNum = 0;
   // Is there a winner?
   let isWinner = false;

   $("#round").html(`Round: ${roundNum}`);

   $("#form").submit((e) => {
      e.preventDefault();

      if (isWinner) {
         reset();
      } else {
         postGuess();
      }
   });

   const reset = () => {
      $("#connorGuesses").html("");
      $("#collinGuesses").html("");
      $("#displayMsg").html("");
      $("#connorHL").html("");
      $("#collinHL").html("");

      $("#connorInput").focus();

      $("#connorInput").prop("disabled", false);
      $("#collinInput").prop("disabled", false);

      $("#button").html("Submit");

      isWinner = false;
      roundNum = 0;

      $("#round").html(`Round: ${roundNum}`); // print round number to DOM

      $.ajax({
         type: "GET",
         url: "http://localhost:8081/reset",
         success: (res) => {},
      });
   };

   const postGuess = () => {
      const connorGuess = $("#connorInput").val();
      const collinGuess = $("#collinInput").val();

      // Check if either inputs are empty
      if (!connorGuess || !collinGuess) {
         $("#displayMsg").html(`Bruh.. Wtf you doing? Can't have empty inputs`);
         return;
      }

      $.ajax({
         type: "POST",
         url: "http://localhost:8081/sendGuesses",
         contentType: "application/x-www-form-urlencoded; charset=UTF-8",
         data: {
            connor: connorGuess,
            collin: collinGuess,
         },
         success: (res) => {
            console.log(res);

            const { guesses, randomNum } = res;

            // Random number checks
            if (
               guesses.connor[guesses.connor.length - 1] == randomNum &&
               guesses.collin[guesses.collin.length - 1] == randomNum
            ) {
               $("#displayMsg").html(
                  `Connor & Collin both guessed the random number of ${res.randomNum}`,
               );
               isWinner = true;
            } else if (guesses.connor[guesses.connor.length - 1] == randomNum) {
               $("#displayMsg").html(
                  `Connor guessed the random number of ${res.randomNum}`,
               );
               isWinner = true;
            } else if (guesses.collin[guesses.collin.length - 1] == randomNum) {
               $("#displayMsg").html(
                  `Collin guessed the random number of ${res.randomNum}`,
               );
               isWinner = true;
            } else {
               $("#displayMsg").html(
                  `Neither of you guessed the random number`,
               );
            }

            roundNum += 1; // Increment round #
            $("#round").html(`Round: ${roundNum}`); // print round number to DOM

            // Print all guesses to DOM
            $("#connorGuesses").html(`Guesses: ${guesses.connor}`);
            $("#collinGuesses").html(`Guesses: ${guesses.collin}`);

            // Reset input values
            $("#connorInput").val("");
            $("#collinInput").val("");

            if (isWinner) {
               $("#button").html("Reset");
               $("#connorHL").html(``);
               $("#collinHL").html(``);

               $("#connorInput").prop("disabled", true);
               $("#collinInput").prop("disabled", true);
            } else {
               $("#connorHL").html(
                  `${
                     guesses.connor[guesses.connor.length - 1] < randomNum
                        ? "Higher"
                        : "Lower"
                  }`,
               );
               $("#collinHL").html(
                  `${
                     guesses.collin[guesses.collin.length - 1] < randomNum
                        ? "Higher"
                        : "Lower"
                  }`,
               );

               // Focus on first input
               $("#connorInput").focus();
            }
         },
         // handles error
         error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.error(textStatus);
            console.error(errorThrown);
            $("#displayMsg").html("This was an error - check console");
         },
      });
   };
});
