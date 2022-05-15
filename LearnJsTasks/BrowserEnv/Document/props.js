// Task 1

let elem = document.querySelector("[data-widget-name]");
console.log(elem.getAttribute("data-widget-name"));

// Task 2

let links = document.querySelectorAll('a');

for (let item of links) {
  let hrefElem = item.getAttribute('href');
  if (!hrefElem) continue;
  if (!hrefElem.includes('://')) continue;
  if (hrefElem.startsWith('http://internal.com')) continue;

  item.style.color = 'orange';
}