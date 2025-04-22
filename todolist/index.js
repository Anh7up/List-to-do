const btndelete = document.querySelectorAll(".delete")
btndelete.forEach(function(btn){
    btn.addEventListener("click",function(){
        this.closest("li").remove()
    })
})
const checkbox = document.querySelector('input[type="checkbox"]');
const labelNameTask = document.querySelector("div.check-box label");
const timetag = document.querySelector(".time");
checkbox.addEventListener("click", function () {
    const li = this.closest("li")
    if (this.checked) {
        labelNameTask.style.opacity = "0.4";
        labelNameTask.style.textDecoration = "line-through";
        timetag.style.opacity = "0.4";
        timetag.style.textDecoration = "line-through";
        li.style.borderBottom = "1.5px solid rgba(0, 0, 0, 0.4)";
    } else {
        labelNameTask.style.opacity = "1";
        labelNameTask.style.textDecoration = "none";
        timetag.style.opacity = "1";
        timetag.style.textDecoration = "none";
        li.style.borderBottom = "1.5px solid black";
    }
})    
const ul = document.querySelector(".list")
const btnopenform = document.querySelector(".open-form")
const form = document.querySelector(".popup-form")
const btncancel = document.querySelector(".cancel")

btnopenform.addEventListener("click", function () {
    form.style.display = "flex"
})

btncancel.addEventListener("click", function (e) {
    e.preventDefault()
    form.style.display = "none"
})

const inputTaskname = document.querySelector("#task-name")
const inputTime = document.querySelector("#time")
const btnAddtask = document.querySelector(".add-task")

btnAddtask.addEventListener("click", function (e) {
    e.preventDefault();

    const taskname = inputTaskname.value;
    const time = inputTime.value;

    if (taskname == "") {
        alert("Pls enter your task name.");
    } else if (time == "") {
        alert("Pls enter your time task.");
    } else {
        const taskId = Date.now();    
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="check-box">
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${taskname}</label>
            <p class="time">${time}</p>
            <button class="edit"><i class="fa-solid fa-square-pen"></i></button>
            <button class="delete" data-id="${taskId}">X</button>
        </div>
    `;

        ul.appendChild(li);

        const btnDeleteNew = li.querySelector(".delete")
        btnDeleteNew.addEventListener("click", function () {
        li.remove()
    })
        const btnNewEdit = li.querySelector(".edit");
        btnNewEdit.addEventListener("click", function () {
        currentEditingLi = li;
        formEdit.style.display = "flex";
    })

        const checkbox = li.querySelector('input[type="checkbox"]');
        const labelNameTask = li.querySelector("label");
        const timetag = li.querySelector(".time");

        checkbox.addEventListener("click", function () {
            if (this.checked) {
                labelNameTask.style.opacity = "0.4";
                labelNameTask.style.textDecoration = "line-through";
                timetag.style.opacity = "0.4";
                timetag.style.textDecoration = "line-through";
                li.style.borderBottom = "1.5px solid rgba(0, 0, 0, 0.4)";
            } else {
                labelNameTask.style.opacity = "1";
                labelNameTask.style.textDecoration = "none";
                timetag.style.opacity = "1";
                timetag.style.textDecoration = "none";
                li.style.borderBottom = "1.5px solid black";
            }
        
            

        
        });
        inputTaskname.value = "";
        inputTime.value = "";
        form.style.display = "none";
        
        if (select.value === "name"){
            sortTaskbyName()
        }
        else if(select.value === "time"){
            sortTaskbyTime()
        }
    }
});
const search = document.querySelector("#search-task")
search.addEventListener("input", function () {
    const inputSearch = search.value.toLowerCase()
    const allTask = document.querySelectorAll("li")

    allTask.forEach(function (task) {
        const textTask = task.innerText.toLowerCase()
        if (textTask.includes(inputSearch)) {
            task.style.display = "block"
        } else {
            task.style.display = "none"
        }
    })
})

function sortTaskbyName() {
    const listli = Array.from(document.querySelectorAll("li"))

    listli.sort(function(a,b){ 
        const labelA = a.querySelector("label").innerHTML.toLowerCase()
        const labelB = b.querySelector("label").innerHTML.toLowerCase()
        return labelA.localeCompare(labelB)
    })
    
    ul.innerHTML = ""

    listli.forEach(function(li){
        ul.appendChild(li)
    })
}

function sortTaskbyTime() {
    const listli = Array.from(document.querySelectorAll("li"))

    listli.sort(function(a,b){
        const timeA = a.querySelector(".time").innerHTML.toLocaleLowerCase()
        const timeB = b.querySelector(".time").innerHTML.toLocaleLowerCase()
        return timeA.localeCompare(timeB)

    })
    ul.innerHTML = ""
    listli.forEach(function(li){
        ul.appendChild(li)
    })
}
const select = document.querySelector("select")

select.addEventListener("change",function(){
    if (select.value === "name"){
        sortTaskbyName()
    }
    else if (select.value === "time"){
        sortTaskbyTime()
    }
})

const btnopenEditForm = document.querySelectorAll(".edit")
const formEdit = document.querySelector(".edit-form")
let currentEditingLi = null;
btnopenEditForm.forEach(function(btn){
    btn.addEventListener("click",function(){
        currentEditingLi = this.closest("li")
        formEdit.style.display = "flex"
    })
})
const btncancelEdit = document.querySelector(".cancel-edit")
btncancelEdit.addEventListener("click", function(e) {
    e.preventDefault()
    formEdit.style.display = "none"
})

const btnSubmitEdit = document.querySelector(".submit-edit")
const newNametask = document.querySelector("#edit-value-name")
const newTimetask = document.querySelector("#edit-value-time")

btnSubmitEdit.addEventListener("click",function(e){
    e.preventDefault()
    const newNamevalue = newNametask.value
    const newTimevalue = newTimetask.value
    if (newNamevalue == "") {
        alert("Pls enter your new name task")
    }
    else if (newTimevalue == ""){
        alert("Pls enter your new time task")
    }
    else{
        currentEditingLi.querySelector("label").innerText = newNamevalue;
        currentEditingLi.querySelector(".time").innerText = newTimevalue;

        formEdit.style.display = "none";
        newNametask.value = ""
        newTimetask.value = ""  
        if (select.value === "name"){
            sortTaskbyName()
        }
        else if (select.value === "time"){
            sortTaskbyTime()
        }
    }

})
