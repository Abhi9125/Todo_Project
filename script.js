const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

let todos = [];

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  console.log(storedTodos);
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";
    li.innerHTML = `
            <input type="checkbox" class="checkbox" ${
              todo.done ? "checked" : ""
            }>
            ${todo.text}
            <button class="delete">X</button>
        `;
    todoList.appendChild(li);
    addListeners(li, i);
  }
}

function addListeners(li, index) {
  const checkbox = li.querySelector(".checkbox");
  const deleteButton = li.querySelector(".delete");
  checkbox.addEventListener("change", function () {
    todos[index].done = !todos[index].done;
    saveTodos();
    renderTodos();
  });
  deleteButton.addEventListener("click", function () {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });
}
addButton.addEventListener("click", function () {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todo = {
      text: todoText,
      done: false,
    };
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
});

loadTodos();
