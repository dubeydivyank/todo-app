//SELECT DOM ELEMENT
const theme = document.querySelector("#theme");
const inputText = document.querySelector("#input-task");
const todoList = document.querySelector(".todolist-container");

//EVENT LISTENERS
// document.addEventListener("DOMContentLoaded", getTodosFromLocal);
theme.addEventListener("click", changeTheme);
inputText.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && inputText.value.length > 0) {
    addTask(inputText.value);
    inputText.value = "";
  }
});

//FUNCTIONS
//change theme
function changeTheme() {
  document.querySelector("body").classList = theme.checked
    ? "light-mode"
    : "dark-mode";
}

//add task
function addTask(text) {
  const elem = document.createElement("div");
  elem.classList.add("todo-container");
  elem.innerHTML = `<label> <input type="checkbox" />
                    <span class="checkmark"></span>
                    <span class="text">${text}</span></label> 
                    <button class="remove-todo-item"></button>`;

  todoList.append(elem);
}

//remove task

//calculate items left count

//filter list

//clear completed tasks

//get & render todos from localstorage
function getTodos() {}

function saveTodosToLocal() {}

function removeFromLocal() {}
