// Task 2

function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}

// Task 4

let ulItem = document.createElement("ul");
document.body.append(ul);

while (true) {
  let content = prompt("Введите текст для элемента списка", "");

  if (!content) break;

  let liItem = document.createElement("li");
  liItem.textContent = content;
  ulItem.append(liItem);
}

// Task 5

let data = {
  Рыбы: {
    форель: {},
    лосось: {},
  },

  Деревья: {
    Огромные: {
      секвойя: {},
      дуб: {},
    },
    Цветковые: {
      яблоня: {},
      магнолия: {},
    },
  },
};

function createTree(container, obj) {
  container.innerHTML = createTreeText(obj);
}

function createTreeText(obj) {
  let li = "";
  let ul;
  for (let key in obj) {
    li += "<li>" + key + createTreeText(obj[key]) + "</li>";
  }
  if (li) {
    ul = "<ul>" + li + "</ul>";
  }
  return ul || "";
}

createTree(container, data);

// Task 9

one.insertAdjacentHTML("afterend", "<li>2</li><li>3</li>");

// Task 10

let sortedRows = Array.from(table.rows).slice(1).sort((a, b) =>
    a.cells[0].innerHTML > b.cells[0].innerHTML ? 1 : -1
  );

table.tBodies[0].append(...sortedRows);
