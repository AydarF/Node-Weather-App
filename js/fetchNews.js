let newsFeed = document.querySelector(".newsFeed");

const controller = new AbortController();
const signal = controller.signal;

fetch(`/newsdata`)
  .then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        return (newsFeed.innerHTML = data.error);
      } else {
        newsFeed.innerHTML = data.newsData.articles
          .map(function(post) {
            if (post.author === null) {
              post.author = "";
            }
            return `${`<div class="newsContainer">`}<h3>${post.title}</h3><p>${post.author}</p><p class="publishedAt">${post.publishedAt}</p><p>${post.description}</p>
         <p><a href=${
           post.url
         } target="_blank" rel="noopener" rel="noreferrer">Read full article [external link]</a></p>${`</div>`}`;
          })
          .join("");
      }
    });
  })
  .catch((error) => {
    newsFeed.textContent = error.message;

    console.log(error.message);
    controller.abort();
    console.log("Fetch aborted");
  });
