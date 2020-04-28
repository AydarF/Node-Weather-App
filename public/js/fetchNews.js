let newsFeed = document.querySelector(".newsFeed");

fetch(`/newsData`).then((res) => {
  res.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      newsFeed.innerHTML = data.newsData.articles
        .map(function(post) {
          if (post.author === null) {
            post.author = "";
          }
          return `${`<div class="newsContainer">`}<h3>${post.title}</h3><p>${post.author}</p><p class="publishedAt">${post.publishedAt}</p><p>${post.description}</p>${`</div>`}`;
        })
        .join("");
    }
  });
});
