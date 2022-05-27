ul.onclick = function (event) {
  if (event.target.tagName != "LI") return;

  if (event.ctrlKey || event.metaKey) {
    toggleSelect(event.target);
  } else {
    singleSelect(event.target);
  }
};

ul.onmousedown = function () {
  return false;
};

function toggleSelect(li) {
  li.classList.toggle("selected");
}

function singleSelect(li) {
  let selected = ul.querySelectorAll(".selected");
  for (let elem of selected) {
    elem.classList.remove("selected");
  }
  li.classList.add("selected");
}

let tooltip = null;

document.onmouseover = function (event) {
  let anchorElem = event.target.closest("[data-tooltip]");
  if (!anchorElem) return;
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
};

document.onmouseout = function () {
  if (tooltip === null) {
    tooltip.remove();
    tooltip = false;
  }
};

function showTooltip(anchorElem, html) {
  let tooltipElem = document.createElement("div");
  tooltipElem.className = "tooltip";
  tooltipElem.innerHTML = html;
  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  let left =
    coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;

  if (left < 0) { 
    left = 0;
  }


  let top = coords.top - tooltipElem.offsetHeight - 10;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 10;
  }

  tooltipElem.style.left = left + "px";
  tooltipElem.style.top = top + "px";

  return tooltipElem;
}
