// Selectors
const todo = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector(".todo-input");
const audio = document.querySelector("#audio")
const filter = document.querySelector(".filter");


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addToDo);
document.addEventListener("keydown", e => {
    if (e.key == 'Enter') addToDo();
});
todoList.addEventListener("click", checkordeleteItem);
filter.addEventListener('click', filterOut);


// Functions
function checkordeleteItem(e) {
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        const parent = item.parentNode;
        parent.classList.add("fall");
        removeLocal(item);
        parent.addEventListener("transitionend", () => {
            parent.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        if (!(item.parentNode.classList.toString().includes('completed'))) {
            audio.play();
        }
        item.classList.add('new-completed');

        let todos;
        if (localStorage.getItem('todos') === "null") {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"))
        }

        let answer;
        let btns = document.querySelectorAll(".complete-btn");
        for (let x = 0; x < btns.length; x++) {
            if (btns[`${x}`].classList.toString().includes('new-completed')) {
                answer = x;
            }
        }
        todos[answer][1] = true;
        localStorage.setItem("todos", JSON.stringify(todos));

        item.classList.remove('new-completed');
        item.parentNode.classList.add('completed');
    }
}


function addToDo() {
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // li
    const todoli = document.createElement("li");
    todoli.classList.add("todo-item");
    todoli.innerText = todoInput.value;

    // check button
    const completed = document.createElement("button");
    completed.innerHTML = '<i class="fa fa-check"></i>';
    completed.classList.add("complete-btn");
    // delete button
    const deleteitem = document.createElement("button");
    deleteitem.innerHTML = '<i class="fa fa-trash"></i>';
    deleteitem.classList.add("delete-btn");

    // add item to div
    todoDiv.appendChild(todoli);
    todoDiv.appendChild(completed);
    todoDiv.appendChild(deleteitem);
    saveTodos(todoInput.value);

    // append the entire div to ul
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function filterOut(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncomplete":
                if (!(todo.classList.contains("completed"))) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === "null") {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push([todo, false]);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === "null") {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(todo => {
        // todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // li
        const todoli = document.createElement("li");
        todoli.classList.add("todo-item");
        todoli.innerText = todo[0];

        // check button
        const completed = document.createElement("button");
        completed.innerHTML = '<i class="fa fa-check"></i>';
        completed.classList.add("complete-btn");
        if (todo[1]) todoDiv.classList.add("completed");

        // delete button
        const deleteitem = document.createElement("button");
        deleteitem.innerHTML = '<i class="fa fa-trash"></i>';
        deleteitem.classList.add("delete-btn");

        // add item to div
        todoDiv.appendChild(todoli);
        todoDiv.appendChild(completed);
        todoDiv.appendChild(deleteitem);

        // append the entire div to ul
        todoList.appendChild(todoDiv);
        // totalTodos += 1
    });
}

function removeLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === "null") {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.splice(todos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

