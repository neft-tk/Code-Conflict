// DOM SELECTORS
const startBattle = document.getElementById("startBattle");
const devChosen = document.getElementById("devOptions");
// Placeholder
let devPlaceholder = 1;
// Global Variables
let enemyChosen;

// Fetch post to send the desired battle dev.
startBattle.addEventListener("click", (event) => {
    event.preventDefault();
    getRandomDev()
    getPlayerDev()
    // fetch("/battle").then(res=>{
    //     // Finding the dev chosen from the player
    //     // Selecting a random dev to fight
    //     if(res.ok){
    //        window.location.href = "/battle"
    //     } else {
    //         alert("trumpet sound")
    //     }
    // })
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
    .then((data) => {
        console.log(data);
    }).catch(err => console.log(err))
}

function getPlayerDev() {
    // Eventually this will return a dev based on player input.
    fetch(`/api/devs/${devPlaceholder}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    }).catch(err => console.log(err))
}

/*
Players will select their dev on this page,

When a player selects their dev, that information will be queried from our db and passed into the battle.handlebars template.

We will also grab a random dev form the pool for them to fight.

Hitting start will initiate the battle script and load the battle template.

We want to send
*/
