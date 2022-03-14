//SELECT DOM ELEMENT
const theme = document.querySelector("#theme");
const inputText = document.querySelector("#input-task");
const todoList = document.querySelector(".todolist-container");
const itemsLeft = document.querySelector(".item-count");
const clearCompleted = document.querySelector(".clear-completed");
const draggables = document.querySelectorAll(".draggable");
//drag n drop functionality
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
});

draggables.forEach((draggable) => {
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodosFromLocal);
theme.addEventListener("click", changeTheme);

inputText.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && inputText.value.length > 0) {
    addTask(inputText.value);
    inputText.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-todo-item")) {
    removeTask(event.target.parentElement);
  }
});

clearCompleted.addEventListener("click", removeAllCompleted);

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
  elem.classList.add("todo-container", "draggable");
  elem.setAttribute("draggable", "true");
  elem.innerHTML = `<label> <input type="checkbox"/>
                    <span class="checkmark"></span>
                    <span class="text">${text}</span></label> 
                    <button class="remove-todo-item"></button>`;

  todoList.append(elem);
  saveTodosToLocal(text);
  updateItemCount(1);
}

//remove task
function removeTask(element) {
  removeFromLocal(element);
  element.remove();
  updateItemCount(-1);
}

//calculate items left count
function updateItemCount(num) {
  if (num === 1) {
    itemsLeft.innerText++;
  } else if (num === -1) {
    itemsLeft.innerText--;
  }
}

//filter list

//clear all completed tasks
function removeAllCompleted() {
  document
    .querySelectorAll('.todo-container input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTask(item.closest("div"));
      // console.log(item.closest("div"));
    });
}

//get & render todos from localstorage
function getTodosFromLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const elem = document.createElement("div");
    elem.classList.add("todo-container", "draggable");
    elem.setAttribute("draggable", "true");
    elem.innerHTML = `<label> <input type="checkbox" />
                      <span class="checkmark"></span>
                      <span class="text">${todo}</span></label> 
                      <button class="remove-todo-item"></button>`;

    todoList.append(elem);
    updateItemCount(1);
  });
}

function saveTodosToLocal(text) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromLocal(element) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const elemTobeRemoved = element.children[0].children[2].innerText;
  todos.splice(todos.indexOf(elemTobeRemoved), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
