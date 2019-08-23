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

// export this constructor so it can be used in other files

module.exports = Player;