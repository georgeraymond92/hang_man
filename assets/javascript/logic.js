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
            image:"habamero.jpeg"
        },
        newspaper: {
            image:"newspaper.jpeg"
        },
        parachute: {
            image:"parachute.jpeg"
        }
    },

    currentWord: null,
    lettersInWord:[],
    matches: [],
    wrongGuesses: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    correctGuess: false,
    wins: 0,

    setupGame: function() {
        // setting a random word to currentWord
        var objKeys = Object.keys(this.hangmanWords);
        this.currentWord = objKeys[Math.floor(Math.random() * objKeys.length)];
        this.lettersInWord = this.currentWord.split("");
        this.guessesLeft = 10;
        console.log(this.currentWord);
        console.log(this.lettersInWord);

    },

    checkGuess: function() {
        for (var i = 0; i < this.lettersInWord.length; i++) {
            if (this.letterGuessed === this.lettersInWord[i]){
                this.lettersInWord.splice(i , 1);
                this.correctGuess = true;
                i--;
            }
        }
        if (this.lettersInWord.length === 0) {
            console.log("you win!!!")
            this.wins++;
            console.log("wins: " + this.wins);
            this.setupGame();
        }
        if (this.correctGuess === false){
            this.guessesLeft--;
        }
        console.log("guesses left: " + this.guessesLeft);
        console.log("letters left: " + this.lettersInWord);
        console.log("is correct: " + this.correctGuess);
        this.correctGuess = false;
        
    },
    takeGuess: function() {
        this.checkGuess()
    },

    updatePage: function() {

    }
}

hangman.setupGame();

document.onkeydown = function(event) {
    // console.log(String.fromCharCode(event.which).toLowerCase());
    hangman.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    hangman.takeGuess()
    console.log(hangman.letterGuessed);
};

