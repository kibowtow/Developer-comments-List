document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const who = params.get("who"); // URL 예: detail.html?who=junho
  const list = document.getElementById("comment-list");

  const comments = JSON.parse(localStorage.getItem("comments")) || {};

  if (comments[who] && comments[who].length > 0) {
    comments[who].forEach((c, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${c}`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = "<li>아직 댓글이 없습니다.</li>";
  }
});