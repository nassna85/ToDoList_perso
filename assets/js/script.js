const inputTask = document.querySelector("#js-input-task");
const btnAddTask = document.querySelector("#js-btn-add-task");

//Function Add Task
handleAddTask = () => {
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
    checkBoxElement.type = "checkbox";

    const valueBtnDelete = document.createElement("i");
    valueBtnDelete.setAttribute("class", "fas fa-trash");
    const btnDeleteElement = document.createElement("button");
    btnDeleteElement.appendChild(valueBtnDelete);
    btnDeleteElement.setAttribute("class", "btn btn-danger btn-delete-task");

    liElement.appendChild(checkBoxElement);
    liElement.appendChild(textInput);
    liElement.appendChild(btnDeleteElement);
    listTask.appendChild(liElement);
    inputTask.value = "";

};

//Click on addTask Button
btnAddTask.addEventListener("click", handleAddTask);
// If press on ENTER
inputTask.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        btnAddTask.click();
    }
});