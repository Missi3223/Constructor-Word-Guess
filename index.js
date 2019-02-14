var wordclass = require("./word.js");
var inquirer = require("inquirer");
var color  = require('colors');

var guesses_left = 10;
var game_over = false;
var letters_guessed = new Set();


var word = new wordclass();

var letters_left = word.letters.length;
console.log(color.magenta("\n---------------------------"));
console.log(color.magenta ("\nNode Constructor Word Game\r\n"));
console.log(color.magenta("---------------------------\n"));

function ask(){
    word.showLetters();
    inquirer.prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a letter"
        }
    ]).then( function(response){
        guess(response.letter);
        if(!game_over){
            ask();
        }
    })
}

ask();
debugger
//Logic for responding to guesses
function guess(letter){
    if(letter.length === 1){
        if(!letters_guessed.has(letter)){
            letters_guessed.add(letter);
        }
        else{
            console.log("\nLetter has already been guessed!\n");
            return;
        }
        var num_correct = word.checkGuess(letter);
        console.log(num_correct);
        if( num_correct > 0){
            console.log(color.rainbow("\nCorrect!\n"));
            letters_left -= num_correct;
        }
        else{
            guesses_left--;
            console.log(color.red("\nIncorrect!  " + (color.white( guesses_left)) + " guesses remaining\n"));
        }
    
        if(letters_left === 0){
            console.log(color.magenta("\nYou win!\n"));
            word.showLetters();
            game_over = true;
        }
    
        if(guesses_left === 0){
            console.log(color.bold("You lose!"));
            console.log("Word was " + word.word)
            game_over = true;
        }

    }
    else{
        console.log("You can only guess one letter at a time!\n");
    }
    
  debugger  
}