// function dropHandler(ev) {
//   ev.preventDefault();

//   if (ev.dataTransfer.items) {
//     for (let i = 0; ev.dataTransfer.items.length; i++) {
//       console.log(ev.dataTransfer.items[i].name);
//       if (ev.dataTransfer.items[i].kind === "file") {
//         const f = ev.dataTransfer.items[i].getAsFile();
//       }
//     }
//   }
//   else {
//     for (let i = 0; i < ev.dataTransfer.files.length; i++) {
//       console.log(`i : ${ev.dataTransfer.files[i].name}`);
//     }
//   }
// }

// function dragoverHandler(ev) {
//   ev.preventDefault();
// }

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

  document.getElementById("dndContainer").style.backgroundColor = "slateblue";
}

function dragleaveHandler(ev) {
  console.log("DragLeaveEvent!");
  ev.preventDefault();

  document.getElementById("dndContainer").style.backgroundColor = "darkslategrey";
}