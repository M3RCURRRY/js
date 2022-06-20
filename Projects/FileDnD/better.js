const dndContainer = document.getElementById("dndContainer");
const dndMilk = document.getElementById("dndMilk");
const dndSides = document.getElementById("dndSides");

dndContainer.ondragleave = dragleaveHandler;
dndContainer.ondrop = dropHandler;
dndContainer.ondragover = dragoverHandler;

dndMilk.ondragover = milkoverHandler;
dndMilk.ondrop = milkdropHandler;

dndSides.ondragover = milkoverHandler;
dndSides.ondrop = milkdropHandler;


//

function dropHandler(ev) {
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    for (let i = 0; i < ev.dataTransfer.items.length; i++) {
      if (ev.dataTransfer.items[i].kind === 'file') {
        const f = ev.dataTransfer.items[i].getAsFile();
        console.log(`${i+1} : ${f.name}`);
      }
    }
  }
}

function dragoverHandler(ev) {
  console.log("DragOverEvent!");
  ev.preventDefault();

  this.style.backgroundColor = "slateblue";
}

function dragleaveHandler(ev) {
  console.log("DragLeaveEvent!");
  ev.preventDefault();

  document.getElementById("dndContainer").style.backgroundColor = "darkslategrey";
}

function milkoverHandler(ev) {
  ev.preventDefault();
  dndSides.style.backgroundColor = "#85929E";
  dndMilk.style.backgroundColor = "#85929E";
}

function milkdropHandler(ev) {
  ev.preventDefault();
  dndSides.style.backgroundColor = "white";
  dndMilk.style.backgroundColor = "white";
}

function milkleaveHandler(ev) {
  ev.preventDefault();
  dndSides.style.backgroundColor = "white";
  dndMilk.style.backgroundColor = "white";
}