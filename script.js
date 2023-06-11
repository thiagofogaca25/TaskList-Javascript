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
  var text;
  if (taskText.length > 20) {
    const sliceText = taskText.substring(0, 20) + '...';
    text = sliceText;
  }else{
    text = taskText;
  }
  var taskList = document.getElementById("task-list");

  var divli = document.createElement("div");
  divli.className = 'row'

  var lidiv = document.createElement("div");
  lidiv.className = 'w-50 col'

  var li = document.createElement("li");
  li.textContent = text;
  li.className = 'w-50'

  var divButtons = document.createElement("div");
  divButtons.className = "w-50 text-end col"

  var editButton = document.createElement("button");
  editButton.className = "btn btn-info rounded-5 text-white w-25 p-0 m-1";
  editButton.innerText = 'edit';
  editButton.addEventListener("click",function(){
    editHandleFormSubmit(taskText);
    
  })

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "btn btn-danger rounded-5 w-25 p-0 m-1";
  deleteButton.addEventListener("click", function() {
    taskList.removeChild(divli);
    deleteTask(taskText);
  });


  var hrList = document.createElement('hr');

  divButtons.appendChild(deleteButton);
  divButtons.appendChild(editButton);

  lidiv.appendChild(li)

  divli.appendChild(lidiv)
  divli.appendChild(divButtons)
  divli.appendChild(hrList)

  taskList.appendChild(divli);
  
}

function editTask(index,name){
  var tasks = loadTasks();
  

  if (index !== -1) {
    tasks[index]= name;
    newTasks = [...tasks]
    saveTasks(newTasks)
    console.log(newTasks);
  }
  location.reload();
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

function editHandleFormSubmit(taskText) {
  
  var items = document.querySelectorAll('.item');
  items.forEach(function(item) {
    item.style.display = 'none';
  });

  var tasks = loadTasks();
  var index = tasks.indexOf(taskText);

  var divformedit = document.createElement('div');
  divformedit.className = "position-fixed center-form ";

  var form = document.createElement('form');

  var formButtons = document.createElement('div');
  formButtons.className = 'd-flex justify-content-between'

  var nameLabel = document.createElement('label');
  nameLabel.className = 'w-100 text-center'
  nameLabel.textContent = 'Edit Task';

  var nameInput = document.createElement('input');
  nameInput.className = 'input-tasktitle mb-2 mt-2 p-3'
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.placeholder = taskText;
  nameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });


  var mytasks = document.getElementById('mytasks');

  mytasks.appendChild(divformedit)
  divformedit.appendChild(form);
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(formButtons);


  var cancelButton = document.createElement('button');
  cancelButton.className = 'btn btn-danger'
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', function(event) {
  
    event.preventDefault();
    items.forEach(function(item) {
      item.style.display = 'block';
    });
   
    form.remove();
  });
  formButtons.appendChild(cancelButton);


  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.className = 'btn btn-success'
  saveButton.addEventListener('click', function(event) {
    event.preventDefault();

    var name = nameInput.value;
 
    if (name !== "") {
      editTask(index,name);
      console.log(name);
    }

    items.forEach(function(item) {
      item.style.display = 'block';
    });

    form.remove();
  });
  formButtons.appendChild(saveButton);


 
}


window.addEventListener("load", function() {
  var tasks = loadTasks();
  for (var i = 0; i < tasks.length; i++) {
    addTask(tasks[i]);
  }
});

document.getElementById("task-form").addEventListener("submit", handleFormSubmit);
