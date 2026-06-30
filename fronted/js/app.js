const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
const topicButtons = document.querySelectorAll(".topic-btn");

topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.textContent.replace("#", "");

    fetchNews(topic);
  });
});

const newsContainer = document.getElementById("newsContainer");

// Load news when page opens
window.addEventListener("load", () => {
  fetchNews("technology");
});

// Fetch news
async function fetchNews(topic) {
  try {
    const response = await fetch(
      `https://newslens-backend-rk90.onrender.com/latest-news?topic=${topic}`,
    );

    const data = await response.json();

    displayNews(data.articles, topic);
  } catch (error) {
    console.log(error);
  }
}

// Display news cards
function displayNews(articles, topic) {
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const card = document.createElement("div");

    card.className = "news-card";

    card.innerHTML = `
            <img src="${article.urlToImage}" alt="news">

            <div class="news-content">

                <h3>${article.title}</h3>

                <p>
                    ${article.description || "No description available"}
                </p>

               <div class="card-buttons">
    <button onclick="window.open('${article.url}')">
        Read More
    </button>

    <button onclick='saveBookmark(
        ${JSON.stringify(article.title)},
        ${JSON.stringify(article.url)},
        ${JSON.stringify(article.urlToImage)},
        ${JSON.stringify(topic)}
    )'>
        ⭐ Save
    </button>
</div>

            </div>
        `;

    newsContainer.appendChild(card);
  });
}
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;

  if (query.trim() !== "") {
    fetchNews(query);
  }
});
function saveBookmark(title, url, image, category) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  bookmarks.push({
    title,
    url,
    image,
    category,
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  alert("Article Saved ⭐");
}
const loggedUser = JSON.parse(localStorage.getItem("user"));

if (loggedUser) {
  const profile = document.getElementById("username");

  if (profile) {
    profile.innerHTML = loggedUser.name;
  }
}
