const url = "https://api.opensauce.uk/user/me";
async function fetchData() {
  const data = await fetch(url, { headers: {'Authorization': localStorage.auth_token || 'Guest' } })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data;
}
let currentUser;
fetchData().then((data) => {
  if (data.error) {
    data = {
      username: "ToddHoward",
      avatar: "https://avatar.proxied.cloud/Todd%20Howard",
      created_at: "1604508483",
      name: "Todd Howard",
      role: "Writer",
      email: "todd@opensauce.uk",
      biography: "Bio could not be fetched from api",
      favorites: [
        {
          Type: "Author",
          Name: "Peter Bread",
          Picture: "https://avatar.proxied.cloud/Peter%20Bread.svg",
          Link: "http://www.example.com",
          Position: 1,
        },
        {
          Type: "Ingredient",
          Name: "Tomato",
          Picture:
            "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
          Link: "https://www.healthline.com/nutrition/foods/tomatoes",
          Postion: 2,
        },
        {
          Type: "Recipe",
          Name: "Sourdough",
          Picture:
            "https://www.theclevercarrot.com/wp-content/uploads/2013/12/sourdough-bread-round-1-of-1.jpg",
          Link:
            "https://www.theclevercarrot.com/2014/01/sourdough-bread-a-beginners-guide/",
          Position: 3,
        },
      ],
    };
  }
  currentUser = {
    Username: data.username,
    avatar: data.avatar,
    Datejoined: data.created_at,
    Name: data.name,
    Email: data.email,
    Type: data.role,
    biography: data.biography,
    Favorites: data.favorites,
  };
});
var account = document.getElementById("account-button");
var isWindowOpen = false;
account.onclick = function () {
  AccountButtonClicked();
};

function AccountButtonClicked() {
  if (isWindowOpen) {
    CloseWindow();
    updateBio();
    isWindowOpen = false;
  } else {
    OpenWindow();
    isWindowOpen = true;
  }
}

function OpenWindow() {
  document.getElementById("account-page").style.display = "initial";
  var image = document.getElementById("account-image");
  image.src = currentUser.avatar || currentUser.avatar;
  document.getElementById("account-name").innerText = currentUser.Name;
  document.getElementById("account-email").innerText = currentUser.Email;
}

function CloseWindow() {
  document.getElementById("account-page").style.display = "none";
}
async function updateBio() {
  let bio = document.getElementById("account-bio");
  if (bio.value.length !== 0 && bio.value !== currentUser.biography) {
    // Authorization wouldn't be here normally but is sent to demostrate the API in use, the user has no administrative permissions.
    fetch("https://api.opensauce.uk/user/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.auth_token,
      },
      body: `{\"biography\":\"${bio.value}\",\"avatar\":\"${currentUser.avatar}\"}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
function ToggleFavorites(idel) {
  let element = document.getElementById("account-favorites");
  let style = getComputedStyle(element);
  if (style.display == "none") {
    idel.style.border = "1px solid black";
    element.style.display = "flex";
    GetFavorites();
  } else {
    idel.style.border = "none";
    element.style.display = "none";
    var node = document.getElementById("favorites-js");
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  }
}

function ToggleSettings(idel) {
  let element = document.getElementById("account-settings-menu");
  let style = getComputedStyle(element);
  if (style.display == "none") {
    idel.style.border = "1px solid black";
    element.style.display = "initial";
    GetAccountSettings();
  } else {
    idel.style.border = "none";
    element.style.display = "none";
  }
}

function GetAccountSettings() {
  if (!currentUser.avatar) currentUser.avatar = 'https://cdn.opensauce.uk/assets/global/Account.png'
  document.getElementById("account-bio").innerText = currentUser.biography;
  document.getElementById("account-image-upload").src =
    currentUser.avatar;
}

function GetFavorites() {
  if (!currentUser.Favorites.length) return
  currentUser.Favorites.forEach((object) => {
    nodeA = document.createElement("a");
    nodeA.href = object.Link;

    nodeI = document.createElement("img");
    nodeI.src = object.Picture;
    nodeI.alt = object.Name;
    nodeI.title = object.Name;

    nodeA.appendChild(nodeI);
    document.getElementById("favorites-js").appendChild(nodeA);
  });
}

function AccountLeft() {
  document.getElementById("favorites-js").scrollLeft -= 500;
}

function AccountRight() {
  document.getElementById("favorites-js").scrollLeft += 500;
  return 200;
}
