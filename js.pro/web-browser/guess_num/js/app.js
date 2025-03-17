/**
 * An instance of this GameState class represents the internal state of
 * our number guessing game. The class defines static factory methods for
 * initializing the game state from different sources, a method for
 * updating the state based on a new guess, and a method for modifying the
 * document based on the current state.
 */
class GameState
{
   // This is a factory function to create a new game
   static newGame()
   {
      let gameState = new GameState();
      gameState.secret = gameState.randomInt(0, 100);  // An integer: 0 < n < 100
      gameState.low = 0;                       // Guesses must be greater than this
      gameState.high = 100;                    // Guesses must be less than this
      gameState.numGuesses = 0;                // How many guesses have been made
      gameState.guess = null;                  // What the last guess was

      return gameState;
   }

   // When we save the state of the game with history.pushState(), it is just
   // a plain JavaScript object that gets saved, not an instance of GameState.
   // So this factory function re-creates a GameState object based on the
   // plain object that we get from a popstate event.
   static fromStateObject(stateObject)
   {
      let gameState = new GameState();
      for (let key of Object.keys(stateObject))
      {
         gameState[key] = stateObject[key];
      }

      return gameState;
   }

   // In order to enable bookmarking, we need to be able to encode the
   // state of any game as a URL. This is easy to do with URLSearchParams.
   toURL()
   {
      let url = new URL(window.location);
      url.searchParams.set("l", this.low);
      url.searchParams.set("h", this.high);
      url.searchParams.set("n", this.numGuesses);
      url.searchParams.set("g", this.guess);

      // Note that we can't encode the secret number in the url, or it
      // will give away the secret. If the user bookmarks the page with
      // these parameters and then returns to it, we will simply pick a
      // new random number between low and high.
      return url.href;
   }

   // This is a factory function that creates a new GameState object and
   // initializes it from the specified URL. If the URL does not contain the
   // expected parameters or if they are malformed it just returns null.
   static fromURL(url)
   {
      let gameState = new GameState();
      let params = new URL(url).searchParams;
      gameState.low = parseInt(params.get("l"));
      gameState.high = parseInt(params.get("h"));
      gameState.numGuesses = parseInt(params.get("n"));
      gameState.guess = parseInt(params.get("g"));

      // If the URL is missing any of the parameters we need or if
      // they did not parse as integers, then return null;
      if (isNaN(gameState.low) || isNaN(gameState.high) || isNaN(gameState.numGuesses) || isNaN(gameState.guess))
      {
         return null;
      }

      // Pick a new secret number in the right range each time we
      // restore a game from a URL.
      gameState.secret = gameState.randomInt(gameState.low, gameState.high);
      return gameState;
   }

   // Return an integer n, min < n < max
   randomInt(min, max)
   {
      return min + Math.ceil(Math.random() * (max - min - 1));
   }

   // Modify the document to display the current state of the game.
   render()
   {
      let heading = document.querySelector("#heading"); // The <h1> at the top
      let range = document.querySelector("#range");     // Display guess range
      let input = document.querySelector("#input");     // Guess input field
      let playAgain = document.querySelector("#playAgain");

      // Update the document heading and title
      heading.textContent = document.title =
         `I'm thinking of a number between ${this.low} and ${this.high}.`;

      // Update the visual range of numbers
      range.style.marginLeft = `${this.low}%`;
      range.style.width = `${(this.high - this.low)}%`;

      // Make sure the input field is empty and focused.
      input.value = "";
      input.focus();

      // Display feedback based on the user's last guess. The input
      // placeholder will show because we made the input field empty.
      if (this.guess === null)
      {
         input.placeholder = "Type your guess and hit Enter";
      }
      else if (this.guess < this.secret)
      {
         input.placeholder = `${this.guess} is too low. Guess again`;
      }
      else if (this.guess > this.secret)
      {
         input.placeholder = `${this.guess} is too high. Guess again`;
      }
      else
      {
         input.placeholder = document.title = `${this.guess} is correct!`;
         heading.textContent = `You win in ${this.numGuesses} guesses!`;
         playAgain.hidden = false;
      }
   }

   // Update the state of the game based on what the user guessed.
   // Returns true if the state was updated, and false otherwise.
   updateForGuess(guess)
   {
      // If it is a number and is in the right range
      if ((guess > this.low) && (guess < this.high))
      {
         // Update state object based on this guess
         if (guess < this.secret)
         {
            this.low = guess;
         }
         else if (guess > this.secret)
         {
            this.high = guess;
         }

         this.guess = guess;
         this.numGuesses++;

         return true;
      }
      else
      { // An invalid guess: notify user but don't update state
         alert(`Please enter a number greater than ${
            this.low} and less than ${this.high}`);
         return false;
      }
   }
}

// With the GameState class defined, making the game work is just a matter
// of initializing, updating, saving and rendering the state object at
// the appropriate times.

// When we are first loaded, we try getting the state of the game from the URL
// and if that fails we instead begin a new game. So if the user bookmarks a
// game that game can be restored from the URL. But if we load a page with
// no query parameters we'll just get a new game.
let gameState = GameState.fromURL(window.location) || GameState.newGame();

// Save this initial state of the game into the browser history, but use
// replaceState instead of pushState() for this initial page
history.replaceState(gameState, "", gameState.toURL());

// Display this initial state
gameState.render();

// When the user guesses, update the state of the game based on their guess
// then save the new state to browser history and render the new state
document.querySelector("#input").onchange = (event) =>
{
   if (gameState.updateForGuess(parseInt(event.target.value)))
   {
      history.pushState(gameState, "", gameState.toURL());
   }

   gameState.render();
};

// If the user goes back or forward in history, we'll get a popstate event
// on the window object with a copy of the state object we saved with
// pushState. When that happens, render the new state.
window.onpopstate = (event) =>
{
   gameState = GameState.fromStateObject(event.state); // Restore the state
   gameState.render();                                 // and display it
};
