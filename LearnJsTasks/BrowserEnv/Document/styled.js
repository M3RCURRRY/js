function showNotification({ top = 0, right = 0, className, html }) {
  let ntf = document.createElement("div");
  ntf.className = "notification";
  if (className) {
    ntf.classList.add(className);
  }

  ntf.style.top = top + "px";
  ntf.style.right = right + "px";

  ntf.innerHTML = html;
  document.body.append(ntf);

  setTimeout(() => ntf.remove(), 1500);
}

showNotification({
  top: 10, // 10px от верхней границы окна (по умолчанию 0px)
  right: 10, // 10px от правого края окна (по умолчанию 0px)
  html: "Hello!", // HTML-уведомление
  className: "welcome" // дополнительный класс для div (необязательно)
});
