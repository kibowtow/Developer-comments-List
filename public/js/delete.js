// public/js/delete.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const who = params.get("who");
  const list = document.getElementById("comment-list");

  // 안전검사
  if (!who) {
    alert("대상을 찾을 수 없습니다.");
    return;
  }

  // 렌더 함수: read.js가 이미 목록을 그리지만, 여기서 버튼을 주입한다
  const injectActions = () => {
    // 현재 저장 상태
    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    const userComments = comments[who] || [];

    // 목록 초기화 및 재구성
    list.innerHTML = "";
    if (userComments.length === 0) {
      list.innerHTML = "<li>아직 댓글이 없습니다.</li>";
      return;
    }

    userComments.forEach((comment, index) => {
      const li = document.createElement("li");

      const text = document.createElement("span");
      text.textContent = `${index + 1}. ${comment}`;

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "수정";
      editBtn.addEventListener("click", () => {
        location.href = `modify.html?who=${encodeURIComponent(who)}&index=${index}`;
      });

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.textContent = "삭제";
      delBtn.addEventListener("click", () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        const latest = JSON.parse(localStorage.getItem("comments")) || {};
        const arr = latest[who] || [];
        if (index < 0 || index >= arr.length) {
          alert("유효하지 않은 인덱스입니다.");
          return;
        }
        arr.splice(index, 1);
        latest[who] = arr;
        localStorage.setItem("comments", JSON.stringify(latest));
        injectActions(); // 삭제 후 재렌더
      });

      li.append(text, document.createTextNode(" "), editBtn, document.createTextNode(" "), delBtn);
      list.appendChild(li);
    });
  };

  injectActions();
});
