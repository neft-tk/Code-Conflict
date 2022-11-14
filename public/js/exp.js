/*

Take in a boolean if the player won (or not)

If they win, they should get exp based on the level of the opponent to theirs

If the exp reaches a certain threshold they should level up

When they level up they should receive 5 more health points (possibly just one more stat point for both power and speed? or they get a stat point(s) they can distribute how they want)

save the new data in the database

*/

// Temp variable names
let devData
// placeholder for the dev that won the fight

function expCheck(playerWin, enemyLevel) {
    if (playerWin) {
        devData.current_exp = userDev.current_exp + (enemyLevel * 25);
        if (userDev.current_exp = (devData.level * 100)) {
            userDev.level = devData.level++;
            userDev.hp = devData.hp + 5;
            userDev.attack = devData.attack ++;
            userDev.speed = devData.speed ++;
            alert("Congrats, your Dev leveled up!")
        }
    } else {
        alert("Sorry, you lost! :(")
    }
}

// Should also make sure that the data is getting returned properly