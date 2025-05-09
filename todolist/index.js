let tasks = [];
let editingIndex = null; 
const searchTask = document.getElementById("search-task");
const noTaskDiv = document.getElementById('no-task');        

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    updateTaskList();
}
checkTaskList();

function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    updateTaskList();
}
function editTask(taskIndex) {
    const task = tasks[taskIndex];
    document.getElementById('edit-value-name').value = task.name;
    document.getElementById('edit-value-time').value = task.time;

    editingIndex = taskIndex;
    document.getElementById('edit-form').style.display = 'block';
}

function toggleTaskCompletion(taskIndex, isChecked) {
    const taskItem = document.querySelector(`li[data-index="${taskIndex}"]`);
    if (isChecked) {
        taskItem.classList.add('completed');
        taskItem.style.opacity = '0.4';
    } else {
        taskItem.classList.remove('completed');
        taskItem.style.opacity = '1';
    }
}

function updateTaskList() {
    const taskList = document.querySelector('.list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.id = 'check-box';
        li.setAttribute('data-index', index);
        li.innerHTML = `
            <label for="task-name-${index}">${task.name}</label>
            <p class="time">${task.time}</p>
            <div id="action">
                <button id="edit" onclick="editTask(${index})"><i class="fa-solid fa-square-pen"></i></button>
                <button id="delete" onclick="deleteTask(${index})">X</button>
                <input type="checkbox" id="task-name-${index}" onchange="toggleTaskCompletion(${index}, this.checked)">
            </div>
        `;
        taskList.appendChild(li);
    });

    checkTaskList();
}

document.getElementById('edit-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (editingIndex !== null) {
        tasks[editingIndex].name = document.getElementById('edit-value-name').value;
        tasks[editingIndex].time = document.getElementById('edit-value-time').value;
        saveTasks();
        updateTaskList();
        document.getElementById('edit-form').style.display = 'none';
        editingIndex = null;
    }
});

document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskTime = document.getElementById('time').value;

    tasks.push({ name: taskName, time: taskTime });
    saveTasks();
    updateTaskList();
    document.getElementById('add-task-form').reset();
    document.getElementById('add-task-form').style.display = 'none';
});

document.getElementById('open-form').onclick = function () {
    document.getElementById('add-task-form').style.display = 'block';
};

document.getElementById('cancel-add').onclick = function () {
    document.getElementById('add-task-form').style.display = 'none';
};
document.getElementById("cancel-edit").onclick = function () {
    document.getElementById("edit-form").style.display = "none";
};

document.getElementById('task-sort').addEventListener('input', function (e) {
    const sortType = e.target.value;

    if (sortType === 'az') {
        tasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'za') {
        tasks.sort((a, b) => b.name.localeCompare(a.name));
    }
    saveTasks();
    updateTaskList();
});

searchTask.addEventListener("input", function () {
    const inputSearch = searchTask.value.toLowerCase();
    const allTask = document.querySelectorAll("li");

    allTask.forEach(function (task) {
        const taskName = task.querySelector("label").innerText.toLowerCase();
        if (taskName.includes(inputSearch)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkTaskList() {
    if (tasks.length === 0) {
        noTaskDiv.style.display = 'block';
    } else {
        noTaskDiv.style.display = 'none';  
    }
}
