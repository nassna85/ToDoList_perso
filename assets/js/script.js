const inputTask = document.querySelector("#js-input-task");
const listTask = document.querySelector(".list-tasks");
const btnAddTask = document.querySelector("#js-btn-add-task");
const btnFilterAll = document.getElementById("js-filter-all");
const btnFilterCompleted = document.getElementById("js-filter-completed");
const messageCount = document.querySelector(".message-count");
const btnClearAllTasks = document.getElementById("js-clear-all-tasks");
//Test count tasks in localstorage for display message directly in homepage
//let count = localStorage.length;
//console.log(count);

//Function Add Task
handleAddTodo = () => {
    const valueTask = inputTask.value;
    const messageError = document.querySelector(".message-error");
    if (valueTask !== "") {
        //Value not empty ? hide the message error
        messageError.style.display = "none";

        //Create li element and config attribute
        const liElement = document.createElement("li");
        liElement.setAttribute("class", "item-task align-items-center");

        //Create input checkbox element and config attribute
        const checkBoxElement = document.createElement('input');
        //Attribute class
        const attrClassCheckbox = document.createAttribute("class");
        attrClassCheckbox.value = "form-control js-checkbox-task";
        checkBoxElement.setAttributeNode(attrClassCheckbox);
        //Attribute onclick
        const attrOnClickCheckbox = document.createAttribute("onclick");
        attrOnClickCheckbox.value = "handleCheckTodo(this)";
        checkBoxElement.setAttributeNode(attrOnClickCheckbox);
        //Attribute Type
        const attrTypeCheckbox = document.createAttribute("type");
        attrTypeCheckbox.value = "checkbox";
        checkBoxElement.setAttributeNode(attrTypeCheckbox);

        //Create input text element and config attribute
        const textInput = document.createElement("input");
        //Attribute class
        const attrClassTextInput = document.createAttribute("class");
        attrClassTextInput.value = "form-control value-task";
        textInput.setAttributeNode(attrClassTextInput);
        //Attribute Type
        textInput.type = "text";
        //Attribute value
        const attrValueTextInput = document.createAttribute("value");
        attrValueTextInput.value = valueTask;
        textInput.setAttributeNode(attrValueTextInput);

        //Create i element and config attribute
        const valueBtnDelete = document.createElement("i");
        //Attribute class
        const attrClassI = document.createAttribute("class");
        attrClassI.value = "fas fa-trash";
        valueBtnDelete.setAttributeNode(attrClassI);
        //Create button delete element and config attribute
        const btnDeleteElement = document.createElement("button");
        //Attribute class
        const attrClassButtonDelete = document.createAttribute("class");
        attrClassButtonDelete.value = "btn btn-danger btn-delete-task";
        btnDeleteElement.setAttributeNode(attrClassButtonDelete);
        //Attribute onclick
        const attrOnClickButtonDelete = document.createAttribute("onclick");
        attrOnClickButtonDelete.value = "handleDeleteTodo(this)";
        btnDeleteElement.setAttributeNode(attrOnClickButtonDelete);
        btnDeleteElement.appendChild(valueBtnDelete);

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

//Get items from localstorage
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
        inputCheckbox.setAttribute("checked", true);
        localStorage.setItem("listTasks", listTask.innerHTML);
    } else {
        element.disabled = false;
        inputCheckbox.removeAttribute("checked");
        localStorage.setItem("listTasks", listTask.innerHTML);
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

//Function Clear All TAsks
handleClearAllTasks = () => {
    const tasks = listTask.children;
    while (tasks.length > 0) {
        tasks[0].remove();
    }
    messageCount.innerHTML = "There is/are currently <span style='color:green;fontWeight:bold'>0</span> task(s) !";
    localStorage.clear();
};

//TEST AFFICHAGE DU COMPTEUR DES LE RECHARGEMENT DE LA PAGE
//handleDisplayCount(count);


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

//Click on ClearAllTAsks button
btnClearAllTasks.addEventListener("click", handleClearAllTasks);


