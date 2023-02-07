const form = document.getElementById("form");
const repoNameDiv = document.querySelector("#repo-container");
const repoNameDivChild = document.querySelector("#repo-container").children[0];
let repoName = repoNameDivChild.dataset.repo;
let userNameRepo = repoNameDivChild.dataset.user;
let userName = document.querySelector("#user-card").dataset.user;

function displayDataUser(response) {
  let userCardElement = document.querySelector("#user-card");
  let userCardHTML = `<div class="header user-card-header d-flex flex-wrap justify-content-between">`;
  userCardHTML =
    userCardHTML +
    `<img src="${response.data.avatar_url}" class="rounded-circle img-start"  width="80" height="80"alt="user-photo">
                    <div class="user-name m-2">
                      <h5 class="card-title "><a href="${response.data.html_url}"  class="name-link">${response.data.name}</a></h5>
                      <p class="card-text "><a href="${response.data.html_url}"  class="sub-name-link">@${response.data.login}</a></p>
                    </div>
                    <a href="${response.data.html_url}"  class="btn btn-dark btn-follow" >Follow</a>
                </div>
                <div class="status d-flex mt-4  mb-2 p-2 text-uppercase border-light-subtle border-top border-bottom">
                  <div class="pe-3 ps-3 border-light border-end  ">
                    <h5 id="repos" class="card-title">${response.data.public_repos}</h5>
                  <p class="card-text"><a href="https://github.com/${response.data.login}?tab=repositories" >repos</a></p>
                  </div>
                  <div class=" pe-3 ps-3 border-light border-end  ">
                  <h5 id="gists" class="card-title">${response.data.public_gists}</h5>
                  <p  class="card-text"><a  href="https://gist.github.com/${response.data.login}">gists</a></p>
                  </div>
                  <div class="ps-3  ">
                    <h5 class="card-title">${response.data.followers}</h5>
                  <p class="card-text"><a   href="https://github.com/${response.data.login}?tab=followers">followers</a></p>
                  </div>
                </div>
                <div class="footer  p-2 ">
                  <p class="card-subtitle pt-2 fw-bold"> <a id="string" href="${response.data.html_url}"></a></p>
                </div>`;
  userCardHTML = userCardHTML + `</div>`;
  userCardElement.innerHTML = userCardHTML;

  if (`${response.data.hireable}` == "true") {
    let footer = document.querySelector("#string");
    footer.classList.add("green");
    footer.innerHTML = "Available for hire";
  } else if (`${response.data.hireable} ` == "false") {
    let footer = document.querySelector("#string");
    footer.classList.add("red");
    footer.innerHTML = "Not available for hire";
  } else {
    let footer = document.querySelector("#string");
    footer.innerHTML = "You can ask about hiring";
    footer.classList.add("grey");
  }
}

function getDataUser(userName) {
  let apiUrl = `https://api.github.com/users/${userName}`;
  axios.get(apiUrl).then(displayDataUser);
}

function displayDataRepo(response) {
  let userRepoElement = document.createElement("div");
  let lastDiv = repoNameDiv.lastChild;

  let insertedElement = repoNameDiv.insertBefore(userRepoElement, lastDiv);
  insertedElement.classList.add("repo-card");
  insertedElement.classList.add("p-2");
  insertedElement.classList.add("mb-3");
  insertedElement.classList.add("github-card");
  let userRepoHTML = `<div class="repo-header d-flex justify-content-between">`;
  userRepoHTML =
    userRepoHTML +
    `<img src="${response.data.owner.avatar_url}" class="rounded-circle img-start"  width="80" height="80"alt="user-photo">
                    <div class="user-name ms-1">
                         <h5 class="card-title "><a href="${response.data.html_url}" class="repo-name-link">${response.data.name}</a></h5>
                         <p class="card-text ">Forked by: <a href="${response.data.owner.html_url}" class="sub-name-link">@${response.data.owner.login}</a></p>
                   </div>
                       <a href="${response.data.html_url}" class="btn btn-dark btn-follow" >Star</a>
                   </div>
                   <div class="git-description border-bottom   mt-2 mb-2 p-2 ">
                     <div id="description" class="  pe-3 ps-2 fs-6">
                       <p  class=" repo-description card-text">${response.data.description}
                       
                       </p>
                       <a class="overflow-x-hidden"  href="${response.data.html_url}" >${response.data.html_url}</a>
                     </div>
                   </div>
                   <div class="footer d-flex text-uppercase">
                     <div class="ps-2  d-flex ">
                       <p class="fw-bold m-0 pe-1">${response.data.forks}</p>
                       <p class="card-text">forks</p>
                     </div>
                     <div class="ps-2 d-flex ">
                       <p class="fw-bold m-0 pe-1">${response.data.stargazers_count}</p>
                       <p class="card-text">stars</p>
                     </div>
                     </div>`;
  userRepoHTML = userRepoHTML + "</div>";
  insertedElement.innerHTML = userRepoHTML;

  if (`${response.data.description}` === "null") {
    let description = document.querySelectorAll(".repo-description");
    let desc = description[description.length - 1];
    desc.innerHTML = `<p> </p>`;
  } else {
  }
}
function getDataRepo(userNameRepo, repoName) {
  let apiUrl = `https://api.github.com/repos/${userNameRepo}/${repoName}`;
  axios.get(apiUrl).then(displayDataRepo);
}

getDataUser(userName);
getDataRepo(userNameRepo, repoName);

const isValidElement = (element) => {
  return element.name && element.value;
};
const formToJSON = (elements) =>
  [].reduce.call(
    elements,
    (data, element) => {
      if (isValidElement(element)) {
        data[element.name] = element.value;
      }
      return data;
    },
    {}
  );

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = "";
  repoNameDiv.lastChild.remove();

  const data = formToJSON(form.elements);

  // variable dataObject contains the data from form
  const dataObject = JSON.stringify(data, null, "  ");

  getDataUser(data.user);
  getDataRepo(data.user, data.name);

  form.reset();
  repoNameDiv.lastChild.remove();
});

// const editor = new EditorJS({

//   holder: "editorjs",

//   tools: {
//     header: {
//       class: Header,
//       config: {
//         levels: [2, 3, 4],
//         defaultLevel: 3,
//       },
//     },
//     paragraph: {
//       class: Paragraph,
//       inlineToolbar: true,
//     },
//   },
//   onChange: (api, event) => {
//     console.log("Now I know that Editor's content changed!", event);
//   },
//   sanitizer: {
//     // Allowed tags
//     allowedTags: ["p", "strong", "ul", "li", "ol", "a", "b", "br", "hr"],
//     // Allowed attributes
//     allowedAttributes: {
//       a: ["href", "target"],
//     },
//   },
// });

// editor.isReady
//   .then(() => {
//     console.log("Editor.js is ready to work!");
//     /** Do anything you need after editor initialization */
//   })
//   .catch((reason) => {
//     console.log(`Editor.js initialization failed because of ${reason}`);
//   });

// const saveButton = document.getElementById("save-button");
//     saveButton.addEventListener("click", () => {
//     editor
//       .save()
//       .then((savedData) => {
//         let savedDataJson = JSON.stringify(savedData, null, 4);
//         console.log(savedDataJson);
//       })
//       .catch((error) => {
//         console.log("Saving failed: ", error);
//       });
//     });
