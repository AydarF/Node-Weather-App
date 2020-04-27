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
          return `${`<div class="newsContainer">`}<h4>${post.title}</h4><p>${post.author}</p><p>${post.publishedAt}</p><p>${post.description}</p>${`</div>`}`;
        })
        .join("");
    }
  });
});
