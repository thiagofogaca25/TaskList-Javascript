function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
}

function addTask(taskText) {
  var taskList = document.getElementById("task-list");

  var li = document.createElement("li");
  li.textContent = taskText;

  var divButtons = document.createElement("div");
  divButtons.className = "w-100 text-center"

  var editButton = document.createElement("button");
  editButton.className = "btn btn-info rounded-5 text-white w-25 p-0 m-1";
  editButton.innerText = 'edit';
  
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "btn btn-danger rounded-5 w-25 p-0 m-1";
  deleteButton.addEventListener("click", function() {
    taskList.removeChild(li);
    deleteTask(taskText);
  });

  var hrbuttons = document.createElement('hr');

  divButtons.appendChild(deleteButton);
  divButtons.appendChild(editButton);
  li.appendChild(divButtons);
  taskList.appendChild(li);
  taskList.appendChild(hrbuttons);
}

function deleteTask(taskText) {
  var tasks = loadTasks();
  var index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  var taskInput = document.getElementById("task-input");

  var taskText = taskInput.value;
  if (taskText !== "") {
    addTask(taskText);

    var tasks = loadTasks();
    tasks.push(taskText);
    saveTasks(tasks);

    taskInput.value = "";
  }
}

window.addEventListener("load", function() {
  var tasks = loadTasks();
  for (var i = 0; i < tasks.length; i++) {
    addTask(tasks[i]);
  }
});

document.getElementById("task-form").addEventListener("submit", handleFormSubmit);
