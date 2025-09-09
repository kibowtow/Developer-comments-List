// public/js/read.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const who = params.get("who");
  const list = document.getElementById("comment-list");

  // 유틸
  const load = () => JSON.parse(localStorage.getItem("comments")) || {};

  const renderEmpty = (msg = "아직 댓글이 없습니다.") => {
    list.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = msg;
    list.appendChild(li);
  };

  const render = () => {
    list.innerHTML = "";

    if (!who) {
      renderEmpty("잘못된 접근입니다.");
      return;
    }

    const comments = load();
    const arr = Array.isArray(comments[who]) ? comments[who] : [];

    if (arr.length === 0) {
      renderEmpty();
      return;
    }

    arr.forEach((item, i) => {
      const li = document.createElement("li");

      // 순번 + 내용
      const label = document.createElement("span");
      label.textContent = `${i + 1}. ${item.text}`;
      li.appendChild(label);

      // 작성일(선택)
      if (item.createdAt) {
        const date = document.createElement("small");
        const d = new Date(item.createdAt);
        date.textContent = ` (${d.toLocaleString()})`;
        li.appendChild(date);
      }

      list.appendChild(li);
    });
  };

  render();
});
