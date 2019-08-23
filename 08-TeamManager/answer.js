// import inquirer
var inquirer = require('inquirer');

// player constructor
var Player = function(name, position, offense, defense){
    this.name = name;
    this.position = position;
    this.offense = offense;
    this.defense = defense;
    this.goodGame = function(){
        if(Math.random() > 0.5){
            this.offense += 5;
        }
        else{
            this.defense +- 5;
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
    const randomNum1 = Math.floor(Math.random() * 20);
    const randomNum2 = Math.floor(Math.random() * 20);
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
            console.log(starter)
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenPlayer',
                    message: 'Who would you like to sub off?',
                    choices: [starter[0]]
                },
                {
                    type: 'list',
                    name: 'chosenPlayer1',
                    message: 'Who would you like to sub on?',
                    choices: [subs[0]]
                }
            ]).then(answers =>{
                console.log(answers)
                // rearranges the arrays depending on who was subbed on/off
                starter.splice(starter.indexOf(answers.chosenPlayer),1);
                subs.splice(subs.indexOf(answers.chosenPlayer1),1)
                starter.push(answers.chosenPlayer1);
                subs.push(answers.chosenPlayer);
                console.log(starter)
                console.log(subs)
            })
        }
    })
}
playGame()   
}
};


createPlayers();





