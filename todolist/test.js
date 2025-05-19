let tasks = [];
let editingIndex = null;
const searchTask = document.getElementById("search-task");
const noTaskDiv = document.getElementById('no-task');

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    updateTaskList();
}
checkTaskList();

// ====== FUNCTION CHÍNH ======

function updateTaskList() {
    const taskList = document.querySelector('.list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-name" style="text-decoration: ${task.completed ? 'line-through' : 'none'}; opacity: ${task.completed ? '0.4' : '1'}">${task.name}</span>
            <span class="task-time">${task.time}</span>
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Gọi từng chức năng riêng biệt
        handleCheckbox(li, index);
        handleEdit(li, index);
        handleDelete(li, index);

        taskList.appendChild(li);
    });

    checkTaskList();
}

// ====== TÁCH RIÊNG CÁC CHỨC NĂNG ======

function handleDelete(li, index) {
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        updateTaskList();
    });
}

function handleEdit(li, index) {
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        const task = tasks[index];
        document.getElementById('edit-value-name').value = task.name;
        document.getElementById('edit-value-time').value = task.time;
        editingIndex = index;
        document.getElementById('edit-form').style.display = 'block';
    });
}

function handleCheckbox(li, index) {
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        updateTaskList();
    });
}

// ====== FORM SỬA ======

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

// ====== FORM THÊM MỚI ======

document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskTime = document.getElementById('time').value;

    tasks.push({ name: taskName, time: taskTime, completed: false });
    saveTasks();
    updateTaskList();
    document.getElementById('add-task-form').reset();
    document.getElementById('add-task-form').style.display = 'none';
});

// ====== BUTTON SHOW/HIDE FORM ======

document.getElementById('open-form').onclick = function () {
    document.getElementById('add-task-form').style.display = 'block';
};

document.getElementById('cancel-add').onclick = function () {
    document.getElementById('add-task-form').style.display = 'none';
};

document.getElementById("cancel-edit").onclick = function () {
    document.getElementById("edit-form").style.display = "none";
};

// ====== SORT TASK ======

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

// ====== SEARCH TASK ======

searchTask.addEventListener("input", function () {
    const inputSearch = searchTask.value.toLowerCase();
    const allTask = document.querySelectorAll("li");

    allTask.forEach(function (task) {
        const taskName = task.querySelector(".task-name").innerText.toLowerCase();

        if (taskName.includes(inputSearch)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
});

// ====== LƯU / KIỂM TRA TASK ======

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
