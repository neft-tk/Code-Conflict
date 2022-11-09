const createDevForm = document.querySelector("#createDev");
createDevForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const devObj = {
        name:document.querySelector("#createDevName").value,
        attack:document.querySelector("#createDevAttack").value,
        speed:document.querySelector("#createDevSpeed").value,
        hp:document.querySelector("#createDevHp").value,
        alignment:document.querySelector("#createDevAlignment").value,
    }

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
            alert("trumpet sound")
        }
    })
})