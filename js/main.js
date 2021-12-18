class TodoList {
  constructor(el) {
    this.todos = [];
    this.el = el;
    this.el.addEventListener('click', (e) => this.handleClick(e));
  }
  addTodo(value) {
    this.todos.push(value);
    this.render();
  }
  removeTodo(id) {
    this.todos = this.todos.filter((el) => {
      return el.id !== id;
    });
    let task = document.querySelectorAll(`[data-id="${id}"]`)[0];
    task.remove();
  }
  getTodos() {
    return this.todos;
  }
  setTodos(todos) {
    this.todos = todos;
  }
  changeStatus(id) {
    let index = this.todos.findIndex((el) => el.id === id);
    this.todos[index].status = !this.todos[index].status;
    let task = document.querySelectorAll(`[data-id="${id}"]`)[0];
    if (this.todos[index].status) {
      task.classList.remove('yellow-task');
      task.classList.add('green-task');
    } else {
      task.classList.remove('green-task');
      task.classList.add('yellow-task');
    }
  }
  handleClick(e) {
    e.preventDefault();
    let target = e.target;
    let id = target.parentNode.dataset.id
    if (target.className.includes('set-status')) {
      this.changeStatus(id);
    } else if (target.className.includes('delete-task')) {
      this.removeTodo(id);
    }
  }
  findTasks(str) {
    let todos = this.getTodos();
    this.todos = this.todos.filter(todo => todo.value && todo.value.includes(str));
    this.render();
    this.setTodos(todos);
  }
  render() {
    let lis = '';
    for (let el of this.todos) {
      if (!el) {
        return;
      }
      let classTask = el.status ? "green-task" : "yellow-task";
      lis += `<li data-id="${el.id}" class ="${classTask}">${el.value}<button class="set-status">Change status</button><button class="delete-task">Delete</button></li>`;
    }
    this.el.innerHTML = lis;
  }
}


class Task {
  constructor(value, status) {
    this.value = value;
    this.status = status;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

let list = document.getElementById('list');
let todo1 = new TodoList(list);
todo1.addTodo(new Task('9345', true));
todo1.addTodo(new Task('2945hv', false));
console.log(todo1.getTodos());
todo1.render();

let addButton = document.getElementById('add');
let findBtn = document.getElementById('find-btn');
let inp = document.querySelector('input');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (inp.value) {
    todo1.addTodo(new Task(inp.value, false));
  }
})

findBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (inp.value) {
    todo1.findTasks(inp.value);
  }
})