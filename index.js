const btnPesquisa = document.getElementById("btn-pesquisa");
const list = document.getElementById("repos");
const cards = document.getElementById("users");

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { "Content-Type": "application/json" } : {},
  }).then((response) => {
    return response.json();
  });
};

const getUser = (e) => {
  e.preventDefault();
  const userGit = document.getElementById("pesquisa").value;
  sendHttpRequest("GET", `https://api.github.com/users/${userGit}`)
    .then((responseData) => {
      console.log(responseData);
      document.getElementById("users").style = "opacity: 100%;";
      document.getElementById("userImg").src = responseData.avatar_url;
      document.getElementById("userTitle").innerText = responseData.login;
      document.getElementById("userBio").innerText = responseData.bio;
      document.getElementById("btnA").href = responseData.html_url;
      document.getElementById("userEmal").innerHTML = responseData.email;
      document.getElementById("followers").innerHTML =
        "followers: " + responseData.followers;
      document.getElementById("following").innerHTML =
        "renderRepos: " + responseData.following;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getRepos = (e) => {
  e.preventDefault();
  const userGit = document.getElementById("pesquisa").value;
  console.log(userGit);
  sendHttpRequest("GET", `https://api.github.com/users/${userGit}/repos`)
    .then((responseData) => {
      const renderRepos = () => {
        for (repos of responseData) {
          console.log(repos.stargazers_count);
          let id = document.createElement("a");
          let tdId = document.createTextNode(repos.name);

          id.className = "list-group-item list-group-item-action";
          id.appendChild(tdId);
          list.appendChild(id);
        }
      };
      return renderRepos();
    })
    .catch((err) => {
      console.log(err);
    });
};

btnPesquisa.addEventListener("click", getUser);
btnPesquisa.addEventListener("click", getRepos);
