const createDevForm = document.querySelector("#createDev");
createDevForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const devObj = {
        name:document.querySelector("#createDevName").value,
        attack:document.querySelector("#createDevAttack").value,
        speed:document.querySelector("#createDevSpeed").value,
        // hp:document.querySelector("#createDevHp").value,
        alignment:document.querySelector("#createDevAlignment").value,
    }

    console.log(parseInt(devObj.attack, 10) + parseInt(devObj.speed, 10));
    
    if ((parseInt(devObj.attack, 10) + parseInt(devObj.speed, 10)) !== 10) {
        alert("Please make sure your Dev's stats total to 10 points.");
        location.reload();
        return
    } else {
        alert("Dev successfully created!");
    };

    console.log(devObj);
    
    fetch("/api/devs/",{
        method:"POST",
        body:JSON.stringify(devObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{

        console.log(res);
        
        if(res.ok){
           location.reload()
        } else {
            alert("Your request was not completed.")
        }
    })
})

const createMoveForm = document.querySelector("#createMove");
createMoveForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const moveObj = {
        name:document.querySelector("#createMoveName").value,
        power:document.querySelector("#createMovePower").value,
        accuracy:document.querySelector("#createMoveAccuracy").value,
        DevId:document.querySelector("#chooseDev").value,
    }

    console.log(moveObj);
    console.log(parseInt(moveObj.accuracy, 10) + parseInt(moveObj.power, 10));
    
    if ((parseInt(moveObj.accuracy, 10) + parseInt(moveObj.power, 10)) !== 10) {
        alert("Please make sure your Move's stats total to 10 points.");
        location.reload();
        return
    } else {
        alert("Move successfully created!");
    };


    fetch("/api/moves/",{
        method:"POST",
        body:JSON.stringify(moveObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{

        console.log(res);
        
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})