let todos = [
  { id: 1, name: "HTML", complete: false },
  { id: 2, name: "CSS", complete: false },
  { id: 3, name: "Basic of javascript", complete: false },
  { id: 4, name: "Node package Manager (npm)", complete: false },
  { id: 5, name: "Git", complete: false }
];
function showTodos() {
  console.clear();
  todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo.name}`);
      console.log(`Complete: ${todo.complete}`);
  });
}
while (true) {
  let action = prompt("Nhập C/R/U/D/E").toUpperCase();

  if (action === "C") {
      let name = prompt("Nhập công việc mới:");
      todos.push({ id: todos.length + 1, name: name, complete: false });
      showTodos();
  }

  else if (action === "R") {
      showTodos();
  }

  else if (action === "U") {
      let index = parseInt(prompt("Nhập vị trí muốn update")) - 1;

      if (todos[index]) {
          let newName = prompt("Tên mới:");
          let status = prompt("Trạng thái (true/false):") === "true";

          todos[index].name = newName;
          todos[index].complete = status;
      }

      showTodos();
  }

  else if (action === "D") {
      let index = parseInt(prompt("Nhập vị trí muốn xóa")) - 1;

      if (todos[index]) {
          todos.splice(index, 1);
      }

      showTodos();
  }

  else if (action === "E") {
      alert("Cảm ơn bạn đã đến với Rikkei Academy");
      break;
  }

  else {
      alert("Nhập sai, thử lại!");
  }
}