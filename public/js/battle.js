// DOM SELECTORS
// ENEMY DISPLAY
const enemyLevel = document.getElementById("enemy-level");
const enemyHp = document.getElementById("enemy-Hp");
const enemyImage = document.getElementById("enemy-Image");
// TEXT CONSOLE
const battleConsole = document.getElementById("battle-console");
// USER MOVES
const moveOne = document.getElementById("move1");
const moveTwo = document.getElementById("move2");
const moveThree = document.getElementById("move3");
const moveFour = document.getElementById("move4");
// USER STATS
const playerLevel = document.getElementById("player-level");
const playerHp = document.getElementById("player-hp");
const playerAtk = document.getElementById("player-atk");

console.log("!!!")

// The battle object will contain both devs information and methods to facilitate the battle
class Battle {
    constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
    }

    // Reduces an hp bar by the amount of damage taken.
    damageCalc(damage, playerHit) {
        playerHit.hp -= damage;
        return playerHit.hp
    }
  }

const currentBattle = new Battle() 

/*
PSEUDOCODE

When a battle starts:

Load the logged in player and enemies information to screen using handlebars

Check both players speed, faster player goes first.

During a turn:

Wait for a selection, (for enemy just immediately randomize their action)

Execute the function/method associated with that selection.

Update HP + anything else

Check if either HP is <= 0

If so:
        That player loses.

        Shows results screen (Win/Loss)

        When player hits continue:

            Take them home.

*/
