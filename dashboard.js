console.log("dashboard js connected");
const currentDateEl = document.querySelector("#current-date");
const today = new Date();
currentDateEl.textContent = today.toDateString(); 
const quotes = [
    "Your Future Is Shaped by the Habits You Repeat",
    "Small steps every day lead to big results",
    "Discipline is choosing what you want most over what you want now",
    "Consistency beats intensity",
    "You don't have to be great to start, but you have to start to be great"
];
const quoteText = document.querySelector("#quote-text");
const newQuoteBtn = document.querySelector("#new-quote-btn");
const saveQuoteBtn = document.querySelector("#save-quote-btn");
newQuoteBtn.addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
});
saveQuoteBtn.addEventListener("click", function() {
    let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    savedQuotes.push(quoteText.textContent);
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
    alert("Quote saved!");
});
const timerDisplay = document.querySelector("#timer-display");
const startBtn = document.querySelector("#start-btn");
const pauseBtn = document.querySelector("#pause-btn");
const resetBtn = document.querySelector("#reset-btn");
let totalSeconds = 25 * 60; 
let timerInterval = null;
function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");
    timerDisplay.textContent = minutesStr + ":" + secondsStr;
}
startBtn.addEventListener("click", function() {
    if (timerInterval !== null) {
        return; 
    }
    timerInterval = setInterval(function() {
        if (totalSeconds > 0) {
            totalSeconds = totalSeconds - 1;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Pomodoro session complete!");
        }
    }, 1000);
});
pauseBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
});
resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 25 * 60;
    updateTimerDisplay();
});
const taskSelect = document.querySelector("#task-select");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function fillTaskDropdown() {
    tasks.forEach(function(task) {
        const option = document.createElement("option");
        option.value = task.text;
        option.textContent = task.text;
        taskSelect.appendChild(option);
    });
}
fillTaskDropdown();
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(t) {
        return t.completed === "completed";
    }).length;
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const totalHabits = habits.length;
    const completedHabits = habits.filter(function(h) {
        return h.completed === true;
    }).length;
    let waterMl = localStorage.getItem("water") || 0;
    let waterLiters = (waterMl / 1000).toFixed(1);
    let sleepRecords = JSON.parse(localStorage.getItem("sleepRecords")) || [];
    const todayStr = new Date().toISOString().split("T")[0];
    const todaySleep = sleepRecords.find(function(r) {
        return r.date === todayStr;
    });
    const statValues = document.querySelectorAll(".stat-value");
    statValues[0].textContent = completedTasks + "/" + totalTasks;
    statValues[1].textContent = completedHabits + "/" + totalHabits;
    statValues[2].textContent = waterTotal + "L";
    statValues[4].textContent = (todaySleep ? todaySleep.hours : 0) + " hours";
}
updateStats();