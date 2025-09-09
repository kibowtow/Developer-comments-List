document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const who = params.get("who");
  const list = document.getElementById("comment-list");

  let comments = JSON.parse(localStorage.getItem("comments")) || {};

function renderComments() {
  list.innerHTML = ""; // 초기화

  if (comments[who] && comments[who].length > 0) {
    comments[who].forEach((comment, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${comment} `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", () => {
        const isConfirmed = confirm("삭제?");
        if (!isConfirmed) return;

        // 삭제 처리
        comments[who].splice(index, 1);

        // 비어 있으면 삭제 키 자체도 제거
        if (comments[who].length === 0) {
          delete comments[who];
        }

        localStorage.setItem("comments", JSON.stringify(comments));
        renderComments();
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  } else {
    list.innerHTML = "<li>아직 댓글이 없습니다.</li>";
  }
}

renderComments();


  // 하단 버튼 추가
  const backBtn = document.createElement("button");
  backBtn.textContent = "목록으로";
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const modifyBtn = document.createElement("button");
  modifyBtn.textContent = "수정하기";
  modifyBtn.style.marginLeft = "10px";
  modifyBtn.addEventListener("click", () => {
    window.location.href = `modify.html?who=${who}`;
  });

  document.body.appendChild(backBtn);
  document.body.appendChild(modifyBtn);
});

