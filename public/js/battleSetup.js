const selectDevForm = document.querySelector("#devOptions");

selectDevForm.addEventListener("onclick", e=>{
    e.preventDefault();
    console.log(selectDevForm.value);
})

