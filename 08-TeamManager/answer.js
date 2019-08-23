// import inquirer
var inquirer = require('inquirer');

// player constructor
var Player = function(name, position, offense, defense){
    this.name = name;
    this.position = position;
    this.offense = parseFloat(offense);
    this.defense = parseFloat(defense);
    this.goodGame = function(){
        if(Math.random() > 0.5){
            this.offense += parseFloat(5);
        }
        else{
            this.defense += parseFloat(5);
        }
    };
    this.badGame = function(){
        if(Math.random() > 0.5){
            this.offense -= 5;
        }
        else{
            this.defense -= 5;
        }
    };
    this.printStats = function(){
        console.log(`Player Name: ${this.name}`);
        console.log(`Player Position: ${this.position}`);
        console.log(`Offense Rating: ${this.offense}`);
        console.log(`Defense Rating: ${this.defense}`);
    };
}

// array holding the starters

var starter = [];

// array holding the subs

var subs = [];

// Counter for creating players
var x = 0;

// counter for play game

var y = 0;

// Variables to sum starter offense stats, and defense stats.
// Global since second function could not access them otherwise
var sumStarterO = 0;
var sumStarterD = 0;
var teamScore = 0;

// user input of players using inquirer
function createPlayers(){
if(x < 2){
inquirer.prompt([
    {
        type: 'input',
        name: 'Player',
        message: 'What is the Players name?'
    },
    {
        type: 'input',
        name: 'position',
        message: 'What position does this player play?',
        
    },
    {
        type: 'input',
        name: 'Offense',
        message: 'What is this players offense rating?',
    },
    {
        type: 'input',
        name: 'Defense',
        message: 'What is this players defense rating?',

    }

])
.then(answers => {
    // create a new instance of the player constructor
    var newPlayer = new Player(
        answers.Player,
        answers.position,
        answers.Offense,
        answers.Defense
        );

        // append the new instance to the array
        starter.push(newPlayer);
        // console.log(startersub.length)
        // increment the loop counter
        x++;
        // run the function again
        createPlayers();
})
}
else if(x < 3){
    inquirer.prompt([
        {
            type: 'input',
            name: 'Player',
            message: 'What is the Players name?'
        },
        {
            type: 'input',
            name: 'position',
            message: 'What position does this player play?',
            
        },
        {
            type: 'input',
            name: 'Offense',
            message: 'What is this players offense rating?',
        },
        {
            type: 'input',
            name: 'Defense',
            message: 'What is this players defense rating?',
    
        }
    
    ])
    .then(answers => {
        // create a new instance of the player constructor
        var newPlayer = new Player(
            answers.Player,
            answers.position,
            answers.Offense,
            answers.Defense
            );
    
            // append the new instance to the array
            subs.push(newPlayer);
            // console.log(startersub.length)
            // increment the loop counter
            x++;
            // run the function again
            createPlayers();
    })
}
else{
    console.log('The Starters')
    for(i=0; i < starter.length; i++){
        console.log('--------------')
        starter[i].printStats();
    }

    console.log('--------------')
    console.log('The Subs')
    for(i=0; i < subs.length; i++){
        console.log('------------')
        subs[i].printStats();
    }

    // plays the game
    function playGame(){
    if( y < 5){
    const randomNum1 = Math.floor(Math.random() * 20);
    const randomNum2 = Math.floor(Math.random() * 20);
    // console.log(randomNum1)
    // console.log(randomNum2)
    // let sumStarterO = 0;
    // let sumStarterD = 0;
    // let teamScore = 0;
    // loop through starter array to get sum of offensive and defensive
    for(i=0; i < starter.length; i++){
        sumStarterO += parseFloat(starter[i].offense);
    }
    for(i=0; i < starter.length; i++){
        sumStarterD += parseFloat(starter[i].offense);
    }

    // change team score depending on comparison of first num
    if(randomNum1 < sumStarterO){
        teamScore += 1;
    }
    // change team score depending on comparison of second num
    if(randomNum2 > sumStarterD){
        teamScore -= 1;
    }
    console.log('-------SCORE--------------------')
    console.log(`The score after ${y + parseFloat(1)} rounds is: ${teamScore}`)

    // prompt user to sub if they wish
    inquirer.prompt([
        {
            type: 'list',
            name: 'DecisionSub',
            message: 'Would you like to sub?',
            choices: ['Yes','No']
        }
    ]).then(answers =>{
        if(answers.DecisionSub === 'Yes'){
            //console.log(starter)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenPlayer',
                    message: 'Who would you like to sub off?',
                    choices: ["Player 1","Player 2"]
                },
                {
                    type: 'list',
                    name: 'chosenPlayer1',
                    message: 'Who would you like to sub on?',
                    choices: ["Player 3"]
                }
            ]).then(answers =>{
                console.log(answers)
                // rearranges the arrays depending on who was subbed on/off
                // starter.splice(starter.indexOf(answers.chosenPlayer),1);
                // subs.splice(subs.indexOf(answers.chosenPlayer1),1)
                // starter.push(answers.chosenPlayer1);
                // subs.push(answers.chosenPlayer);
                // console.log(starter)
                // console.log(subs)
                if(answers.chosenPlayer === "Player 1"){
                    var personSub = starter[0]
                    var personStart = subs[0]
                    subs.splice(0,1)
                    subs.push(personSub)
                    starter.push(personStart)
                    starter.splice(0,1)
                    console.log('----PLAYERS ON BENCH-----')
                    console.log(subs);
                    console.log('----STARTERS-----')
                    console.log(starter)
                    
                }
                else if(answers.chosenPlayer === "Player 2"){
                    var personSub = starter[1]
                    var personStart = subs[0]
                    subs.push(personSub)
                    subs.splice(0,1)
                    starter.push(personStart)
                    starter.splice(1,1)
                    console.log('-----PLAYERS ON BENCH-----')
                    console.log(subs);
                    console.log('----STARTERS----')
                    console.log(starter)
                }
                y++
                playGame()
            })
        }
        else{
            // if person selects no subs, play the next round
            y++
            playGame()
        }
    })
}
else {
    console.log(`---------------FINAL SCORE-----------------`)
    console.log(`Five rounds have been played. The final score is ${teamScore}`)
    if(teamScore > 0){
        for(i=0; i < starter.length; i++){
            starter[i].goodGame()
        }
    }
    else if(teamScore < 0) {
        for(i=0; i < starter.length; i++){
            starter[i].goodGame()
        }
    }
    else{
       console.log('It was a tie game. No changes made to player attributes') 
    }

    console.log(`------UPDATED STATS------`)
    console.log('STARTERS')
    for(i=0; i < starter.length; i++){
        starter[i].printStats()
    }
    console.log('BENCH PLAYERS')
    for(i=0; i < subs.length; i++){
        subs[i].printStats()
    }
    
    // prompt the user and ask them if they would like to play again
    inquirer.prompt([
        {
          type: 'list',
          name: 'playagain',
          message: 'Would you like to play again?' ,
          choices: ["Yes","No"] 
        }
    ]).then(function(answers){
        if(answers.playagain === "Yes"){
            y = 0;
            playGame()
        }
        else{
            console.log('Thanks for playing. See you next game')
        }
    })
}}
playGame()

}
};


createPlayers();





