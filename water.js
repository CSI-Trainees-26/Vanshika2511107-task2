console.log("water js connected");
const waterAmount=document.querySelector("#water-amount");
const addWaterBtn = document.querySelector("#add-water-btn");
const waterProgress=document.querySelector("#water-progress");
const progress=document.querySelector(".progress");
const resetWaterBtn=document.querySelector("#reset-water-btn")
let water=JSON.parse(localStorage.getItem("water"));;
let waterGoal=2500;
    waterAmount.textContent=water+"ml";
    waterProgress.textContent=water+" / "+waterGoal+" ml";
    let percentage=(water/waterGoal)*100;
    progress.style.width=percentage+"%";  
addWaterBtn.addEventListener("click",function(){
    if(water<waterGoal){
    water=water+250;
    localStorage.setItem("water",JSON.stringify(water));
    }
    waterAmount.textContent=water+"ml";
    waterProgress.textContent=water+" / "+waterGoal+" ml";
    let percentage=(water/waterGoal)*100;
    progress.style.width=percentage+"%";
});
resetWaterBtn.addEventListener("click",()=>{
water=0;
localStorage.removeItem("water");
waterAmount.textContent=water+"ml";
waterProgress.textContent=water+" / "+waterGoal+" ml";
progress.style.width=percentage="0%";

});