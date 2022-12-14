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

    // Accuracy system: checks to see if a move hit based on it's accuracy
    accuracyCheck(selectedMove) {
      let accuracyMove = (selectedMove.accuracy + (Math.floor(Math.random() * 11) + 1))
     
      if (accuracyMove <= 5) {
        return false
      } else {
        return true
      }
    }

    // attack is your dev stat, power is the move stat. Damage is based on the attack stat with a percent modifier from power
    // Reduces an hp bar by the amount of damage taken.
    // Logs what happened in the console.
    damageCalc(move, playerHit, playerAttacking) {
        const newP = document.createElement("p");
        let modifier = ((move.power) / 100)
        let damage = Math.floor((userDev.attack * modifier) * 25)
        
        if(currentBattle.accuracyCheck(move)) {
          playerHit.hp -= damage;
          newP.innerText = playerAttacking.name + " did " + damage + " to " + playerHit.name;
          battleConsole.append(newP); 
        } else {
            newP.innerText = playerAttacking.name + "'s attack missed! No damage dealt to " + playerHit.name;
            battleConsole.append(newP); 
        }
        return playerHit.hp
    }

    enemyMove() {
      let numRandom = Math.floor(Math.random() * compDev.Moves.length);
      console.log(compDev.Moves[numRandom]);
      
      return compDev.Moves[numRandom];
    }

    // Renders user buttons which will load the start of the round with the move based on the player's choice.
    battleStartUp() {
      console.log(userDev);
      
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
      let tempDevStats = {
        level: userDev.level + 1,
        hp: ((userDev.level * 5) + 20),
        attack: userDev.attack + 1,
        speed: userDev.speed + 1,
      }
      console.log(tempDevStats);      
      alert("Congrats, your Dev leveled up!")
      fetch(`/api/devs/${userDev.id}`, {
        method: "PUT",
        body: JSON.stringify({
          level: tempDevStats.level,
          current_exp: 0,
          hp: tempDevStats.hp,
          attack: tempDevStats.attack,
          speed: tempDevStats.speed
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json())  
      fetch("/profile").then(res=> {
        if(res.ok){
          window.location.href = "/profile"
        } else {
          alert("profile link didnt work")
        }
      })
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



function roundStart(e, selectedMove) {
  let enemyAttack = currentBattle.enemyMove();

  //determine which dev is faster
  if (userDev.speed >= compDev.speed) {
    currentBattle.damageCalc(selectedMove, compDev, userDev);
    checkHealth();
    currentBattle.damageCalc(enemyAttack, userDev, compDev);
    checkHealth();
  } else {
    currentBattle.damageCalc(enemyAttack, userDev, compDev);
    checkHealth();
    currentBattle.damageCalc(selectedMove, compDev, userDev);
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
