// public/js/read.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const who = params.get("who");
  const list = document.getElementById("comment-list");

<<<<<<< Updated upstream
  // 유틸
=======
>>>>>>> Stashed changes
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
    } else {
      arr.forEach((item, i) => {
        const li = document.createElement("li");

        const label = document.createElement("span");
        label.textContent = `${i + 1}. ${item.text}`;
        li.appendChild(label);

        if (item.createdAt) {
          const date = document.createElement("small");
          const d = new Date(item.createdAt);
          date.textContent = ` (${d.toLocaleString()})`;
          li.appendChild(date);
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.style.marginLeft = "10px";
        editBtn.addEventListener("click", () => {
          location.href = `update.html?who=${encodeURIComponent(who)}&index=${i}`;
        });
        li.appendChild(editBtn);

        const delBtn = document.createElement("button");
        delBtn.textContent = "삭제";
        delBtn.style.marginLeft = "5px";
        delBtn.addEventListener("click", () => {
          if (confirm("정말 삭제하시겠습니까?")) {
            arr.splice(i, 1);
            comments[who] = arr;
            localStorage.setItem("comments", JSON.stringify(comments));
            render(); // 삭제 후 다시 렌더
          }
        });
        li.appendChild(delBtn);

        list.appendChild(li);
      });
    }

<<<<<<< Updated upstream
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
=======
    // 🟢 목록으로 버튼 추가
    const goBackBtn = document.createElement("button");
    goBackBtn.textContent = "이전으로";
    goBackBtn.type = "button";
    goBackBtn.style.display = "block";
    goBackBtn.style.marginTop = "20px";
    goBackBtn.addEventListener("click", () => {
      location.href = "index.html";
>>>>>>> Stashed changes
    });

    // <ul> 다음에 버튼 삽입
    list.parentElement.appendChild(goBackBtn);
  };

  render();
});
