const delButtons = document.querySelectorAll(".delBtn");

delButtons.forEach(delBtn=>{
    delBtn.addEventListener("click",e=>{
        const devId = e.target.getAttribute("data-devId")
        console.log(devId);
        fetch(`/api/devs/${devId}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
                location.reload();
            } else {
                alert("trumpet sound")
            }
        })
    })
})