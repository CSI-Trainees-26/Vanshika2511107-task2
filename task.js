console.log("task js connected");
const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const pendingTasks = document.querySelector("#pending-tasks");
const completedTasks = document.querySelector("#completed-tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {
    pendingTasks.innerHTML="";
    completedTasks.innerHTML="";
    tasks.forEach(function(task) {
        const taskElement = document.createElement("div");
        taskElement.className = "task-item";
        taskElement.draggable = true;
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
           saveTasks();
                displayTasks();
            }
        });
        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });
            saveTasks();
            displayTasks();
        });
        taskElement.appendChild(taskText);
        taskElement.appendChild(editBtn);
        taskElement.appendChild(deleteBtn);
        taskElement.addEventListener("dragstart", function(event) {
           event.dataTransfer.setData(
                "text/plain",
                task.id
            );

        });
        if (task.status === "pending") {
            pendingTasks.appendChild(taskElement);
        } else if (task.status === "completed") {
            completedTasks.appendChild(taskElement);
        }
    });
}
addTaskBtn.addEventListener("click", function() {
    const text = taskInput.value.trim();
    if (text === "") {
        return;
    }
    const task = {
        id: Date.now(),
        text: text,
        status: "pending",
        pomodoroSessions: 0
    };
    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    displayTasks();
});
completedTasks.addEventListener("dragover", function(event) {
    event.preventDefault();
});
completedTasks.addEventListener("drop", function(event) {
    event.preventDefault();
    const taskId = Number(
        event.dataTransfer.getData("text/plain")
    );
    const task = tasks.find(function(item) {
        return item.id === taskId;
    });
    if (task) {
        task.status = "completed";
        saveTasks();
        displayTasks();
    }
});
displayTasks();