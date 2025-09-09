// public/js/update.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const who = params.get("who");
  const index = Number(params.get("index"));

  if (!who || Number.isNaN(index)) {
    document.body.innerHTML = "<p>잘못된 접근입니다.</p>";
    return;
  }

  const store = JSON.parse(localStorage.getItem("comments")) || {};
  const arr = store[who] || [];

  if (index < 0 || index >= arr.length) {
    document.body.innerHTML = "<p>대상을 찾을 수 없습니다.</p>";
    return;
  }

  // 간단한 수정 폼 생성
  const h2 = document.createElement("h2");
  h2.textContent = "댓글 수정";

  const form = document.createElement("form");

  const textarea = document.createElement("textarea");
  textarea.id = "modify-text";
  textarea.rows = 6;
  textarea.cols = 40;
  textarea.value = arr[index];

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "저장";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "취소";

  form.appendChild(textarea);
  form.appendChild(document.createElement("br"));
  form.appendChild(saveBtn);
  form.appendChild(document.createTextNode(" "));
  form.appendChild(cancelBtn);

  document.body.prepend(h2);
  document.body.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const next = textarea.value.trim();
    if (!next) {
      alert("내용을 입력하세요.");
      return;
    }

    const latest = JSON.parse(localStorage.getItem("comments")) || {};
    const target = latest[who] || [];
    if (index < 0 || index >= target.length) {
      alert("유효하지 않은 인덱스입니다.");
      return;
    }
    target[index] = next;
    latest[who] = target;
    localStorage.setItem("comments", JSON.stringify(latest));

    alert("수정되었습니다.");
    location.href = `detail.html?who=${encodeURIComponent(who)}`;
  });

  cancelBtn.addEventListener("click", () => {
    location.href = `detail.html?who=${encodeURIComponent(who)}`;
  });
});
