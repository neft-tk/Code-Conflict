// DOM SELECTORS
// ENEMY DISPLAY
const enemyLevel = document.getElementById("enemy-level");
const enemyHp = document.getElementById("enemy-Hp");
const enemyImage = document.getElementById("enemy-Image");
// TEXT CONSOLE
const battleConsole = document.getElementById("battle-console");
// USER STATS
const playerLevel = document.getElementById("player-level");
const playerHp = document.getElementById("player-hp");
const playerAtk = document.getElementById("player-atk");
const playerMoves = document.getElementById("player-moves")
// Session Data
let userDev = JSON.parse(localStorage.getItem("userDev"));
let compDev = JSON.parse(localStorage.getItem("compDev"));

// The battle object will contain both devs information and methods to facilitate the battle
class Battle {
    constructor(allyDev, enemyDev) {
      // Both devs
      this.allyDev = allyDev;
      this.enemyDev = enemyDev;
      // Battle Methods
      this.battleSummary = function () {
        console.log(allyDev);
        console.log(enemyDev);
      }
    }

    // Reduces an hp bar by the amount of damage taken.
    damageCalc(damage, playerHit) {
        playerHit.hp -= damage;
        return playerHit.hp
    }

    // Renders user buttons
    battleStartUp(allyDev) {
      for (let i = 0; i < userDev.Moves.length; i++) {
        const element = userDev.Moves[i];

      let btn = document.createElement("button");

      btn.setAttribute("class", "btn");
      btn.id = "move" + i;
      btn.innerText = `${element.name}`;

      playerMoves.append(btn)

      }
    }
  }

const currentBattle = new Battle(userDev, compDev) 


currentBattle.battleStartUp();
currentBattle.battleSummary();

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
