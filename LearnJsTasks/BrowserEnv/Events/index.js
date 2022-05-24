document.getElementById("hidediv").onclick = function () {
  document.getElementById("text").hidden = true;
};

field.onclick = function (event) {
  let fieldCoords = this.getBoundingClientRect();

  let ballCoords = {
    top:
      event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2,
    left:
      event.clientX -
      fieldCoords.left -
      field.clientLeft -
      ball.clientWidth / 2,
  };

  if (ballCoords.top < 0) ballCoords.top = 0;

  if (ballCoords.left < 0) ballCoords.left = 0;

  if (ballCoords.left + ball.clientWidth > field.clientWidth) {
    ballCoords.left = field.clientWidth - ball.clientWidth;
  }

  if (ballCoords.top + ball.clientHeight > field.clientHeight) {
    ballCoords.top = field.clientHeight - ball.clientHeight;
  }

  ball.style.left = ballCoords.left + "px";
  ball.style.top = ballCoords.top + "px";
};

container.onclick = function (event) {
  if (event.target.className != "remove-button") return;

  let pane = event.target.closest(".pane");
  pane.remove();
};

grid.onclick = function (e) {
  if (e.target.tagName != "TH") return;

  let th = e.target;
  doSort(th.cellIndex, th.dataset.type);
};

function doSort(colNum, type) {
  let tbody = grid.querySelector("tbody");
  let rowsArray = Array.from(tbody.rows);
  let compare;

  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };
      break;
    case "string":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }

  rowsArray.sort(compare);
  tbody.append(...rowsArray);
}

contents.onclick = function (event) {
  function handleLink(href) {
    let isLeaving = confirm(`Leave for ${href}?`);
    if (!isLeaving) return false;
  }

  let target = event.target.closest("a");

  if (target && contents.contains(target)) {
    return handleLink(target.getAttribute("href"));
  }
};
