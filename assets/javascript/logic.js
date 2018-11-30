// global game object
var hangman = {
    // all of the hangman words and the name of the photo associated with them
    hangmanWords: {
        tank: {
            image:"tank.jpeg"
        },
        dog: {
            image:"dog.jpeg"
        },
        computer: {
            image:"computer.jpeg"
        },
        boomerang: {
            image:"boomerang.jpeg"
        },
        comb: {
            image:"comb.jpeg"
        },
        baseball: {
            image:"baseball.jpeg"
        },
        rabbit: {
            image:"rabbit.jpeg"
        },
        hamburger: {
            image:"hamburger.jpeg"
        },
        kombucha: {
            image:"kombucha.jpeg"
        },
        smartphone: {
            image:"smartphone.jpeg"
        },
        habanero: {
            image:"habanero.jpeg"
        },
        newspaper: {
            image:"newspaper.jpeg"
        },
        parachute: {
            image:"parachute.jpeg"
        }
    },

    // variables needed
    currentWord: null,
    lettersInWord:[],
    matches: [],
    wrongGuesses: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

    // this functions sets up the game on page load
    setupGame: function() {
        // setting a random word to currentWord
        var objKeys = Object.keys(this.hangmanWords);
        this.currentWord = objKeys[Math.floor(Math.random() * objKeys.length)];
        this.lettersInWord = this.currentWord.split("");
        document.querySelector("#letters-guessed").innerHTML = "";
        this.checkLocal();
        document.querySelector("#wins").innerHTML = this.wins;
        this.updateWordDisplay();
        this.processUpdateTotalGuesses();

    },
    
    // updated the page on key up after each guess and restarts if you
    //  are out of guesses.
    updatePage: function(letter) {
        if (this.guessesLeft === 0) {
            this.restartGame();
        }
        else{
            this.updateGuesses(letter);

            this.updateMatchedLetters(letter);

            this.updateWordDisplay();

            if(this.updateWins() === true) {
                this.restartGame();
            }
        }

    },

    processUpdateTotalGuesses: function() {
        this.totalGuesses = this.lettersInWord.length +5;
        this.guessesLeft = this.totalGuesses;

        document.querySelector("#displayguesses").innerHTML = this.guessesLeft;
    },

    updateGuesses: function(letter) {
        if((this.wrongGuesses.indexOf(letter) === -1) && (this.lettersInWord.indexOf(letter) === -1)){
            this.wrongGuesses.push(letter);
            this.guessesLeft--;
            document.querySelector("#displayguesses").innerHTML = this.guessesLeft;
            document.querySelector("#letters-guessed").innerHTML = this.wrongGuesses.join(", ");
        }
    },

    updateMatchedLetters: function(letter) {
        for (var i = 0; i < this.lettersInWord.length; i++) {
            if ((letter === this.lettersInWord[i]) && (this.matches.indexOf(letter) === -1)) {
                this.matches.push(letter);
            }

        }
    },

    // function updates the word on the dom to show the letters guessed int he word.
    updateWordDisplay: function() {

        var wordDisplay = "";

        // Loop through the letters of the current word
        for (var i = 0; i < this.lettersInWord.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (this.matches.indexOf(this.lettersInWord[i]) !== -1) {
            wordDisplay += this.lettersInWord[i];
            }
            // If it hasn't been guessed, display a "_" instead.
            // with spaces on both sides
            else {
                wordDisplay += "&nbsp;_&nbsp;";
            }
        }
        document.querySelector("#current-word").innerHTML = wordDisplay;
    },

    // restarts the game and sets your guesses back to zero
    restartGame: function() {
        document.querySelector("#displayguesses").innerHTML = "";
        this.currentWord = null;
        this.lettersInWord = [];
        this.matches = [];
        this.wrongGuesses = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.updateWordDisplay();
    },

    // detects if you win or loose and update the data
    updateWins: function() {
        var win;


        if (this.matches.length === 0) {
            win = false;
        }
        else {
            win = true;
        }

        for(var i = 0; i < this.lettersInWord.length; i++) {
            if (this.matches.indexOf(this.lettersInWord[i]) === -1) {
                win = false;
            }
        }

        if (win) {

            this.wins++;
            // console.log("setting the local storage")
            window.localStorage.setItem("wins", this.wins);
            // console.log("local: " + window.localStorage.getItem("wins"));
            

            document.querySelector("#wins").innerHTML = this.wins;

            document.querySelector("#img-target").innerHTML = "<img class='image' src='assets/images/" +
            this.hangmanWords[this.currentWord].image + "'>"

            return true
        }
        return false;
    },

    // checks local storage to see if you have any wins
    checkLocal: function() {
        if (Number(window.localStorage.getItem("wins")) !== null) {
            this.wins = window.localStorage.getItem("wins");
        }else {
            this.wins = 0;
        }
    }
};

// runs on page load to set up the game
hangman.setupGame();

// listening for the keypress
document.onkeyup = function(event) {
    
    hangman.letterGuessed = String.fromCharCode(event.which).toLowerCase();

    hangman.updatePage(hangman.letterGuessed);
};
