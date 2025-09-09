function deleteReview(id) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    location.reload(); // 새로고침
}
function goToModify(id) {
    window.location.href = `./modify.html?id=${id}`;
}