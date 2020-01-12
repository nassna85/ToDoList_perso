const inputTask = document.querySelector("#js-input-task");
const listTask = document.querySelector(".list-tasks");
const btnAddTask = document.querySelector("#js-btn-add-task");
const btnFilterAll = document.getElementById("js-filter-all");
const btnFilterCompleted = document.getElementById("js-filter-completed");
const messageCount = document.querySelector(".message-count");

//Function Add Task
handleAddTodo = () => {
    const valueTask = inputTask.value;
    const messageError = document.querySelector(".message-error");
    if (valueTask !== "") {
        messageError.style.display = "none";
        //const listTask = document.querySelector(".list-tasks");
        const textInput = document.createElement("input");
        textInput.setAttribute("class", "form-control value-task");
        textInput.type = "text";
        textInput.value = valueTask;

        const liElement = document.createElement("li");
        liElement.setAttribute("class", "item-task align-items-center");

        const checkBoxElement = document.createElement('input');
        checkBoxElement.setAttribute("class", "form-control js-checkbox-task");
        checkBoxElement.setAttribute("onclick", "handleCheckTodo(this)");
        checkBoxElement.type = "checkbox";

        const valueBtnDelete = document.createElement("i");
        valueBtnDelete.setAttribute("class", "fas fa-trash");
        const btnDeleteElement = document.createElement("button");
        btnDeleteElement.appendChild(valueBtnDelete);
        btnDeleteElement.setAttribute("class", "btn btn-danger btn-delete-task");
        btnDeleteElement.setAttribute("onclick", "handleDeleteTodo(this)");

        liElement.appendChild(checkBoxElement);
        liElement.appendChild(textInput);
        liElement.appendChild(btnDeleteElement);

        handleDisplayTodo(listTask, liElement);

        //Reset field input task
        inputTask.value = "";

        //Save localstorage
        localStorage.setItem("listTasks", listTask.innerHTML);
    } else {
        messageError.style.display = "block";
    }

};

const saved = localStorage.getItem("listTasks");
if (saved) {
    listTask.innerHTML = saved;
}

//Function display count task
handleDisplayCount = count => {
    messageCount.innerHTML = `There is/are currently <span style='color:green;fontWeight:bold'>${count}</span> task(s) !`;
};

//Function delete task
handleDeleteTodo = task => {
    task.parentNode.remove();
    let count = listTask.children.length;
    handleDisplayCount(count);
};

//Function check task
handleCheckTodo = inputCheckbox => {
    const element = inputCheckbox.nextElementSibling;
    element.classList.toggle("line-checkbox");
    if (element.classList.contains("line-checkbox")) {
        element.disabled = true;
    } else {
        element.disabled = false;
    }

};

//Function display task
handleDisplayTodo = (parent, item) => {
    parent.appendChild(item);
    //Get number of item and display this
    let count = parent.children.length;
    handleDisplayCount(count);
};

//Function FilterAll
handleFilterAll = () => {
    const tasks = document.querySelectorAll(".value-task");
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].parentNode.style.display = "flex";
        //Display button delete on item li
        tasks[i].nextElementSibling.style.display = "block";
        count++
    }
    handleDisplayCount(count);
};

//Function FilterCompleted
handleFilterCompleted = () => {
    const tasks = document.querySelectorAll(".value-task");
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].classList.contains("line-checkbox")) {
            tasks[i].parentNode.style.display = "none";
        } else {
            //Hide button delete when filter completed
            tasks[i].nextElementSibling.style.display = "none";
            count++;
        }
    }
    handleDisplayCount(count);
};


//Click on addTask Button
btnAddTask.addEventListener("click", handleAddTodo);

// If press on ENTER
inputTask.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        btnAddTask.click();
    }
});

//Click on filterAll
btnFilterAll.addEventListener("click", handleFilterAll);

//Click on filterCompleted
btnFilterCompleted.addEventListener("click", handleFilterCompleted);


