// Task 1

// Внешние углы
let outer_coords = elem.getBoundingClientRect();
let outer1 = [outer_coords.left, outer_coords.top];
let outer2 = [outer_coords.right, outer_coords.bottom];

// Левый верхний внутренний угол
let innerLeft = [
  outer_coords.left + field.clientLeft,
  outer_coords.top + field.clientTop,
];

// Нижний правый внутренний угол
let bottomRight = [
  outer_coords.left + elem.clientLeft + elem.clientWidth,
  outer_coords.top + elem.clientTop + elem.clientHeight,
];

// Task 3

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + Window.pageYOffset,
    left: box.left + Window.pageXOffset,
  };
}

function positionAt(anchor, position, elem) {
  let anchorCoords = getCoords(anchor);

  switch (position) {
    case "top":
      elem.style.left = anchorCoords.left + "px";
      elem.style.top = anchorCoords.top - elem.offsetHeight + "px";
      break;

    case "right":
      elem.style.left = anchorCoords.left + anchor.offsetWidth + "px";
      elem.style.top = anchorCoords.top + "px";
      break;

    case "bottom":
      elem.style.left = anchorCoords.left + "px";
      elem.style.top = anchorCoords.top + anchor.offsetHeight + "px";
      break;
  }
}

function showNote(anchor, position, html) {
  let note = document.createElement("div");
  note.className = "note";
  note.innerHTML = html;
  document.body.append(note);

  positionAt(anchor, position, note);
}

let blockquote = document.querySelector("blockquote");

showNote(blockquote, "top", "note above");
showNote(blockquote, "right", "note at the right");
showNote(blockquote, "bottom", "note below");
