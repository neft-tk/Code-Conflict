// DOM SELECTORS
const startBattle = document.getElementById("startBattle");
const devChosen = document.getElementById("devOptions");
// Placeholder
// TODO: Figure out how to get the options values working.
let devPlaceholder = 1;
// Global Variables
let enemyChosen;
let userDev;
let compDev;
let finalDevs;

// These return empty the first time we run them so we run them on load to get that out of the way.
getRandomDev();
getPlayerDev();
finalizePlayers(userDev, compDev);

// TODO: Convert to async await syntax.

// Fetch post to send the desired battle dev.
startBattle.addEventListener("click", (event) => {
    event.preventDefault();
    // Randomize enemy dev
    getRandomDev();
    // Get whatever dev the player has selected.
    getPlayerDev();
    // Send both to the backend to be added to session data.
    finalizePlayers(userDev, compDev);
    // Hit the /battle route which loads our player data from the session into our handlebars template. 
    fetch("/battle").then(res=>{
        if(res.ok){
           window.location.href = "/battle"
        } else {
            alert("trumpet sound")
        }
    })
})

// Gets a random dev
function getRandomDev() {
    // Retrieve a list of all created devs.
    fetch("/api/devs")
        .then((response) => response.json())
        .then((data) => {
            // Choose a random dev.
            enemyChosen = Math.floor(Math.random() * data.length + 1);
            // Get their stats.
            getRandomDevStats();
        }).catch(err => console.log(err))
}

// Based on what dev index we got, grab that devs object from the devs api.
function getRandomDevStats() {
    fetch(`/api/devs/${enemyChosen}`)
        .then((response) => response.json())
        .then((randomDevObject) => {
            compDev = randomDevObject;
        }).catch(err => console.log(err))
}

function getPlayerDev() {
    // Eventually this will return a dev based on player input.
    fetch(`/api/devs/${devPlaceholder}`)
        .then((response) => response.json())
        .then((playerChosenDev) => {
            // Store the user dev object in a variable
            userDev = playerChosenDev;
        }).catch(err => console.log(err))
}

// This function bundles the final battling devs in an object that is sent to our battle routes in a post request.
function finalizePlayers(userDev, compDev) {
    fetch("/api/battle/start", {
        method: "POST",
        body: JSON.stringify({ userDev, compDev }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then((combatants) => {
            console.log(combatants)
            finalDevs = combatants;
        })
}

/*
Players will select their dev on this page,

When a player selects their dev, that information will be queried from our db and passed into the battle.handlebars template.

We will also grab a random dev form the pool for them to fight.

Hitting start will initiate the battle script and load the battle template.

We want to send
*/
