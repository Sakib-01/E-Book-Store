const allPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  loadPost(data.posts);
};

const searchPosts = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${id}`
  );
  const data = await res.json();
  loadPost(data.posts);
};

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", function () {
  const searchBar = document.getElementById("search").value;
  searchPosts(searchBar);
});

let count = 0;
function clickEvent(title, comment) {
  count++;
  console.log(count);
  const markCount = document.getElementById("mark-count");
  markCount.innerText = count;
  const markContainer = document.getElementById("mark-container");
  const markContent = document.createElement("div");
  markContent.innerHTML = `
  <div
                class="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div class="flex justify-between items-center gap-6">
                  <p>${title}</p>
                  <span class="text-gray-400">${comment}</span>
                </div>
              </div>
  `;
  markContainer.appendChild(markContent);
}

const loadPost = (data) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  data.forEach((element) => {
    const postContent = document.createElement("div");
    postContent.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 mt-1 flex mr-3">
              <img src="${element.image}" alt="${
      element.title
    }" class="w-full h-full object-cover rounded-full" />
              <div  id="active" class="badge badge-xs ${
                element.isActive == true ? "badge-success" : "badge-error"
              }  indicator-item  act"></div>
            </div>
            <div class="flex justify-center items-end">
              <div class="flex flex-col">
                <div class="flex gap-5">
                <p class="text-sm text-gray-500">${element.category}</p>
                <p class="text-sm text-gray-500">${element.author.name}</p>
              </div>
              <h2 class="font-semibold text-lg">${element.title}</h2>
              <p class="text-sm text-gray-500 mt-2">${element.description}</p>
              <div class="mt-4 flex justify-between items-center space-x-4 text-gray-400">
                <div class="flex items-center gap-5">
                  <span class="flex items-center space-x-1 gap-1">
                    <i class="fas fa-thumbs-up"></i> ${element.view_count}
                  </span>
                  <span class="flex items-center space-x-1 gap-1">
                    <i class="fas fa-comment"></i> ${element.comment_count}
                  </span>
                  <span class="flex items-center space-x-1 gap-1">
                    <i class="fas fa-clock"></i> ${element.posted_time}
                  </span>
                </div>
                </div>              
              </div>
                <div class="ml-96">
                  <button onclick="clickEvent('${element.title}','${
      element.comment_count
    }')" class="btn btn-ghost btn-circle">
                    <div class="indicator border-2 rounded-full p-3  hover:bg-blue-700 hover:text-white">
                      <i class="fa-solid fa-book-bookmark"></i>
                    </div>
                  </button>
                </div>
            </div>
          </div>
        </div>
    `;

    // Append the created content
    postContainer.appendChild(postContent);
  });
};

allPosts();
