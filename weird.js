var word = "WTF";

function say(word) {
   console.log(word);
}

function execute(someFunction, value) {
   someFunction(value);
}

execute(say, word);

//weirder
execute(function (word) { console.log(word + " x 2")}, word);
