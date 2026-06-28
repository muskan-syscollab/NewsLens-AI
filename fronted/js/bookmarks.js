const container = document.getElementById("bookmarkContainer");

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
const clearBtn = document.getElementById("clearAllBtn");

clearBtn.addEventListener("click", () => {
  if (confirm("Delete all bookmarks?")) {
    localStorage.removeItem("bookmarks");

    location.reload();
  }
});
if (bookmarks.length === 0) {
  container.innerHTML = `
        <h2 style="text-align:center;">
            No saved articles yet ⭐
        </h2>
    `;

  document.getElementById("clearAllBtn").style.display = "none";
}
bookmarks.forEach((article, index) => {
  const card = document.createElement("div");

  card.className = "news-card";

  card.innerHTML = `
        <img src="${article.image}" alt="news">

        <div class="news-content">

            <h3>${article.title}</h3>

            <p>
                Category:
                ${article.category}
            </p>

            <div class="card-buttons">

    <button onclick="window.open('${article.url}')">
        Read Article
    </button>

    <button onclick="removeBookmark(${index})">
        ❌ Remove
    </button>

</div>
        </div>
    `;

  container.appendChild(card);
});
function removeBookmark(index) {
  if (!confirm("Remove this bookmark?")) {
    return;
  }

  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  bookmarks.splice(index, 1);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  location.reload();
}
