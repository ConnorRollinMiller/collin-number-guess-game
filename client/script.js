$( document ).ready(() => {

   // keeps track of rounds
   let roundNum = 0;

   $("#roundNum").html(`Round: ${roundNum}`);

   $("#form").submit((e) => {
      e.preventDefault();

      const connorGuess = $('#connorInput').val();
      const collinGuess = $('#collinInput').val();

      $.ajax({
         type: 'POST',
         url: 'http://localhost:8081/sendGuesses',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
            "connor": connorGuess,
            "collin": collinGuess
         },
         success: (res) => {

            // Random number checks
            if (res.connor && res.collin) {
               $("#displayMsg").html(`Connor & Collin both guessed the random number of ${res.randomNum}`);
            } else if (res.connor) {
               $("#displayMsg").html(`Connor guessed the random number of ${res.randomNum}`);
            } else if (res.collin) {
               $("#displayMsg").html(`Collin guessed the random number of ${res.randomNum}`);
            } else {
               $("#displayMsg").html(`Neither of you guessed the random number of ${res.randomNum}`);
            }

            round += 1; // Increment round #
            $("#roundNum").html(`Round: ${roundNum}`); // print round number to DOM

            // Reset input values
            $('#connorInput').val("");
            $('#collinInput').val("");

            // Focus on first input
            $('#connorInput').focus();
         },
         // handles error
         error: (XMLHttpRequest, textStatus, errorThrown) => {
            console.error(textStatus);
            console.error(errorThrown);
            $("#displayMsg").html("This was an error - check console");
         }
      });

   });

});