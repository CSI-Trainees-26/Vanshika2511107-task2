console.log("sleep js connected");

const sleepHoursInput = document.querySelector("#sleep-hours");
const saveSleepBtn = document.querySelector("#save-sleep-btn");
const todaySleep = document.querySelector("#today-sleep");
const totalSleepEl = document.querySelector("#total-sleep");
const averageSleepEl = document.querySelector("#average-sleep");
const sleepGraph = document.querySelector("#sleep-graph");
let sleepRecords = JSON.parse(localStorage.getItem("sleepRecords")) || [];
saveSleepBtn.addEventListener("click", function() {
    const hours = parseFloat(sleepHoursInput.value);
    if (isNaN(hours) || hours <= 0) {
        return;
    }
    const today = new Date().toISOString().split("T")[0]; 
    const existing = sleepRecords.find(function(record) {
        return record.date === today;
    });
    if (existing) {
        existing.hours = hours;
    } else {
        sleepRecords.push({ date: today, hours: hours });
    }
    saveSleepRecords();
    sleepHoursInput.value = "";
    displayTodaySleep();
    displayWeeklySummary();
    displaySleepGraph();
});
function saveSleepRecords() {
    localStorage.setItem("sleepRecords", JSON.stringify(sleepRecords));
}
function displayTodaySleep() {
    const today = new Date().toISOString().split("T")[0];
    const todayRecord = sleepRecords.find(function(record) {
        return record.date === today;
    });
    if (todayRecord) {
        todaySleep.textContent = todayRecord.hours + " hrs";
    } else {
        todaySleep.textContent = "0 hrs";
    }
}
function getLastSevenDays() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toISOString().split("T")[0]);
    }
    return days;
}
function displayWeeklySummary() {
    const last7Days = getLastSevenDays();
    const thisWeekRecords = sleepRecords.filter(function(record) {
        return last7Days.includes(record.date);
    });
    let total = 0;
    thisWeekRecords.forEach(function(record) {
        total = total + record.hours;
    });
    const average = thisWeekRecords.length > 0
        ? (total / thisWeekRecords.length).toFixed(1)
        : 0;
    totalSleepEl.textContent = total.toFixed(1) + " hrs";
    averageSleepEl.textContent = average + " hrs";
}
function displaySleepGraph() {
    sleepGraph.innerHTML = "";
    const last7Days = getLastSevenDays();
    last7Days.forEach(function(dateStr) {
        const record = sleepRecords.find(function(r) {
            return r.date === dateStr;
        });
        const hours = record ? record.hours : 0;
        const date = new Date(dateStr);
        const bar = document.createElement("div");
        bar.className = "sleep-bar";
        bar.style.height = (hours * 15) + "px"; // scale bar height by hours
        bar.title = hours + " hrs";

        const label = document.createElement("span");
        label.textContent = date.getDate();
        const wrapper = document.createElement("div");
        wrapper.className = "sleep-bar-wrapper";
        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        sleepGraph.appendChild(wrapper);
    });
}
displayTodaySleep();
displayWeeklySummary();
displaySleepGraph();