// public/js/read.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const who = params.get("who");
  const list = document.getElementById("comment-list");

  // 로컬스토리지에서 댓글 불러오기
  const load = () => JSON.parse(localStorage.getItem("comments")) || {};

  // 댓글이 없을 때 메시지 표시
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

      // 작성일 표시
      if (item.createdAt) {
        const date = document.createElement("small");
        const d = new Date(item.createdAt);
        date.textContent = ` (${d.toLocaleString()})`;
        li.appendChild(date);
      }

      // 수정 버튼
      const editBtn = document.createElement("button");
      editBtn.textContent = "수정";
      editBtn.style.marginLeft = "10px";
      editBtn.addEventListener("click", () => {
        // update.html 페이지로 이동, index 전달
        location.href = `update.html?who=${encodeURIComponent(who)}&index=${i}`;
      });
      li.appendChild(editBtn);

      // 삭제 버튼
      const delBtn = document.createElement("button");
      delBtn.textContent = "삭제";
      delBtn.style.marginLeft = "5px";
      delBtn.addEventListener("click", () => {
        if (confirm("정말 삭제하시겠습니까?")) {
          arr.splice(i, 1);
          comments[who] = arr;
          localStorage.setItem("comments", JSON.stringify(comments));
          render(); // 삭제 후 화면 갱신
        }
      });
      li.appendChild(delBtn);

      list.appendChild(li);
    });
  };

  render();
});
