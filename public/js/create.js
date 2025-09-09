document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("comment-form");
  const selectBox = document.getElementById("select-box");
  const textArea = document.getElementById("comment-text");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 submit 막기

    const who = selectBox.value;
    const text = textArea.value.trim();

    if (!text) {
      alert("댓글을 입력하세요!");
      return;
    }

    // localStorage에서 데이터 불러오기
    let comments = JSON.parse(localStorage.getItem("comments")) || {};

    // 해당 인물 키가 없으면 생성
    if (!comments[who]) comments[who] = [];

    // 댓글 추가
    comments[who].push(text);

    // 다시 저장
    localStorage.setItem("comments", JSON.stringify(comments));

    // 완료 알림
    alert("등록되었습니다.");

    // 입력창 초기화
    textArea.value = "";
  });
});