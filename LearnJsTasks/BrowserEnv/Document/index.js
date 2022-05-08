/*
элемент <div>?
<ul>?
второй <li> (с именем Пит)?
*/

console.log("div");
console.log(document.body.childNodes[1]);
console.log(document.body.firstElementChild);
console.log(document.body.children[0]);

console.log("ul");
console.log(document.body.childNodes[3]);
console.log(document.body.children[1]);
//console.log(document.body.lastElementChild); // А это так-то <script>...</script>

console.log("last li");
console.log(document.body.childNodes[3].childNodes[3]);
console.log(document.body.children[1].lastElementChild);