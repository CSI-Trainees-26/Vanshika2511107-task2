console.log("habits js connected");
const habitInput = document.querySelector("#habit-input");
const habitCategory = document.querySelector("#habit-category");
const addHabitBtn = document.querySelector("#add-habit-btn");
const habitsList = document.querySelector("#habit-list");
const habitGraph = document.querySelector("#habit-graph");
let habits = JSON.parse(localStorage.getItem("habits")) || [];
function displayHabits() {
    habitsList.innerHTML = "";
    habits.forEach(function(habit, index) {
        const div = document.createElement("div");
        div.textContent =
            habit.name + " - " + habit.category;
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", function() {
            habit.completed = true;
            saveHabits();
            displayHabits();
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            habits.splice(index, 1);
            saveHabits();
            displayHabits();
        });
        div.appendChild(completeBtn);
        div.appendChild(deleteBtn);
        habitsList.appendChild(div);
    });
}
addHabitBtn.addEventListener("click", function() {
    const name = habitInput.value;
    const category = habitCategory.value;
    if (name === "") {
        return;
    }
    const habit = {
        name: name,
        category: category,
        completed: false
    };
    habits.push(habit);
    saveHabits();
    habitInput.value = "";
    displayHabits();
    displayHabitGraph();
});
function saveHabits() {
    localStorage.setItem(
        "habits",
        JSON.stringify(habits)
    );
}
function displayHabitGraph() {
    habitGraph.innerHTML = "";


displayHabits();
displayHabitGraph();

