console.log("water js connected");
const waterAmount=document.querySelector("#water-amount");
const addWaterBtn = document.querySelector("#add-water-btn");
const waterProgress=document.querySelector("#water-progress");
const progress=document.querySelector(".progress");
let water=0;
let waterGoal=2500;
addWaterBtn.addEventListener("click",function(){
    if(water<waterGoal){
    water=water+250;
    }
    waterAmount.textContent=water+"ml";
    waterProgress.textContent=water+" / "+waterGoal+" ml";
    let percentage=(water/waterGoal)*100;
    progress.style.width=percentage;
});

