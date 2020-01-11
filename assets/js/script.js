const inputTask = document.querySelector("#js-input-task");
const btnAddTask = document.querySelector("#js-btn-add-task");
//const btnDeleteTask = document.querySelectorAll("button.btn-delete-task");
//const inputCheckbox = document.querySelectorAll(".js-checkbox-task");

//Function Add Task
handleAddTodo = () => {
    const valueTask = inputTask.value;
    const listTask = document.querySelector(".list-tasks");
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
    //listTask.appendChild(liElement);
    handleDisplayTodo(listTask, liElement);
    inputTask.value = "";

};

//Function delete task
handleDeleteTodo = task => {
    task.parentNode.remove();
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

handleDisplayTodo = (parent, item) => {
    parent.appendChild(item);
};


//Click on addTask Button
btnAddTask.addEventListener("click", handleAddTodo);

// If press on ENTER
inputTask.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        btnAddTask.click();
    }
});

//Click in deleteTask Button
/*
btnDeleteTask.forEach(btn => {
    btn.addEventListener("click", handleDeleteTodo);
});
*/


