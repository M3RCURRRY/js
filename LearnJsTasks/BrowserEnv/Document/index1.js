let tableElement = document.body.firstElementChild;

for(let i = 0; i < tableElement.rows.length; i++) {
  let row = tableElement.rows[i];
  row.cells[i].style.backgroundColor = "red";
}