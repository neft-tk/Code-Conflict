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
const playerMoveList = document.getElementById("player-moves")
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
    // attack is your dev stat, power is the move stat. Damage is based on the attack stat with a percent modifier from power
    // Reduces an hp bar by the amount of damage taken.
    // Logs what happened in the console.
    damageCalc(move, playerHit, playerAttacking) {
        const newP = document.createElement("p");

        let modifier = ((move.power) / 10)

        let damage = Math.floor((userDev.attack * modifier) * 10)
        
        playerHit.hp -= damage;

        newP.innerText = playerAttacking.name + " did " + damage + " to " + playerHit.name;
        battleConsole.append(newP); 

        return playerHit.hp
    }

    enemyMove() {
      let numRandom = Math.floor(Math.random() * compDev.Moves.length);
      console.log(compDev.Moves[numRandom]);
      
      return compDev.Moves[numRandom];
    }

    // Renders user buttons which will load the start of the round with the move based on the player's choice.
    battleStartUp(allyDev) {
      for (let i = 0; i < userDev.Moves.length; i++) {
        const element = userDev.Moves[i];

      let btn = document.createElement("button");

      btn.setAttribute("class", "btn");
      btn.id = "move" + i;
      btn.innerText = `${element.name}`;
      btn.addEventListener("click", function(e) {
        let selectedMove = element
        roundStart(e, selectedMove);
      })

      playerMoveList.append(btn)

      }
    }
  }

const currentBattle = new Battle(userDev, compDev) 

function checkHealth() {
  if (compDev.hp <= 0) {
    userDev.current_exp = userDev.current_exp + (compDev.level * 25);
    if (userDev.current_exp = (userDev.level * 100)) {
        userDev.level = userDev.level++;
        userDev.hp = userDev.hp + 5;
        userDev.attack = userDev.attack ++;
        userDev.speed = userDev.speed ++;
        alert("Congrats, your Dev leveled up!")
    }
  } else if (userDev.hp <= 0){
    alert("Sorry, you lost! Try again :(")
    fetch("/profile").then(res=> {
      if(res.ok){
        window.location.href = "/profile"
      } else {
        alert("profile link didnt work")
      }
    })
  }
}

function winBattle() {
  alert("Congrats, you won!")

}

function loseBattle() {

}


function roundStart(e, selectedMove) {
  // console.log(e.target.innerText);
  // console.log(selectedMove);
  // console.log(compDev.speed);
  let enemyAttack = currentBattle.enemyMove();

  //determine which dev is faster
  if (userDev.speed >= compDev.speed) {
    currentBattle.damageCalc(selectedMove, compDev, userDev)
    currentBattle.damageCalc(enemyAttack, userDev, compDev)
    checkHealth();
  } else {
    currentBattle.damageCalc(selectedMove, compDev, userDev)
    currentBattle.damageCalc(enemyAttack, userDev, compDev)   
    checkHealth();
  }
};


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
