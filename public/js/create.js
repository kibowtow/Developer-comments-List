// public/js/create.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");
  const selectBox = document.getElementById("select-box");
  const textArea = document.getElementById("comment-text");

  // 유틸
  const load = () => JSON.parse(localStorage.getItem("comments")) || {};
  const save = (data) => localStorage.setItem("comments", JSON.stringify(data));
  const now = () => new Date().toISOString(); // ISO로 저장

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const who = String(selectBox.value || "").trim();
    const text = String(textArea.value || "").trim();

    if (!who) {
      alert("대상을 선택하세요.");
      return;
    }
    if (!text) {
      alert("댓글을 입력하세요!");
      textArea.focus();
      return;
    }
    if (text.length > 500) {
      alert("댓글은 500자 이내로 입력하세요.");
      return;
    }

    const comments = load();
    if (!Array.isArray(comments[who])) comments[who] = [];

    // 고유 id 부여(타임스탬프+랜덤)
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    comments[who].push({ id, text, createdAt: now() });

    save(comments);
    alert("등록되었습니다.");

    textArea.value = "";
    // 필요 시 detail 페이지로 바로 이동하려면 아래 사용:
    // location.href = `detail.html?who=${encodeURIComponent(who)}`;
  });
});
