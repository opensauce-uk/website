const url = "https://api.opensauce.uk/user/get/ToddHoward";
async function fetchData() {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return data;
}
let currentUser;
fetchData().then((data) => {
  if (data.error)
    data = {
      username: "ToddHoward",
      avatar: "https://avatar.proxied.cloud/Todd%20Howard",
      created_at: "1604508483",
      name: "Todd Howard",
      role: "Writer",
      email: "todd@opensauce.uk",
      bio: "Bio could not be fetched from api",
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
  currentUser = {
    Username: data.username,
    ProfilePicture: data.avatar,
    Datejoined: data.created_at,
    Name: data.name,
    Email: data.email,
    Type: data.role,
    Bio: data.biography,
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
  image.src = currentUser.ProfilePicture;
  document.getElementById("account-name").innerText = currentUser.Name;
  document.getElementById("account-email").innerText = currentUser.Email;
}

function CloseWindow() {
  document.getElementById("account-page").style.display = "none";
}
async function updateBio() {
  let bio = document.getElementById("account-bio");
  if (bio.value.length !== 0 && bio.value !== currentUser.Bio) {
    // Authorization wouldn't be here normally but is sent to demostrate the API in use, the user has no administrative permissions.
    fetch("https://api.opensauce.uk/user/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmRkY2I4ZTAxNzc2YzAwMDk5Yzk2M2QiLCJuYW1lIjoiVG9kZCBIb3dhcmQiLCJ1c2VybmFtZSI6IlRvZGRIb3dhcmQiLCJlbWFpbCI6InRvZGRAb3BlbnNhdWNlLnVrIiwiY3JlYXRlZF9hdCI6MTYwODM3MTA4NjE0MSwiZmF2b3JpdGVzIjpbeyJUeXBlIjoiQXV0aG9yIiwiTmFtZSI6IlBldGVyIEJyZWFkIiwiUGljdHVyZSI6Imh0dHBzOi8vY2RuLm9wZW5zYXVjZS51ay9wcm9maWxlcy9QZXRlckJyZWFkLmpwZyIsIkxpbmsiOiJodHRwOi8vd3d3LmV4YW1wbGUuY29tIiwiUG9zaXRpb24iOjF9LHsiVHlwZSI6IkluZ3JlZGllbnQiLCJOYW1lIjoiVG9tYXRvIiwiUGljdHVyZSI6Imh0dHBzOi8vaW1hZ2VzLXByb2QuaGVhbHRobGluZS5jb20vaGxjbXNyZXNvdXJjZS9pbWFnZXMvQU5faW1hZ2VzL3RvbWF0b2VzLTEyOTZ4NzI4LWZlYXR1cmUuanBnIiwiTGluayI6Imh0dHBzOi8vd3d3LmhlYWx0aGxpbmUuY29tL251dHJpdGlvbi9mb29kcy90b21hdG9lcyIsIlBvc3Rpb24iOjJ9LHsiVHlwZSI6IlJlY2lwZSIsIk5hbWUiOiJTb3VyZG91Z2giLCJQaWN0dXJlIjoiaHR0cHM6Ly93d3cudGhlY2xldmVyY2Fycm90LmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8xMi9zb3VyZG91Z2gtYnJlYWQtcm91bmQtMS1vZi0xLmpwZyIsIkxpbmsiOiJodHRwczovL3d3dy50aGVjbGV2ZXJjYXJyb3QuY29tLzIwMTQvMDEvc291cmRvdWdoLWJyZWFkLWEtYmVnaW5uZXJzLWd1aWRlLyIsIlBvc2l0aW9uIjozfSx7IlR5cGUiOiJBdXRob3IiLCJOYW1lIjoiU3Rld2FydCBTY2htaXR0IiwiUGljdHVyZSI6Imh0dHBzOi8vY2RuLm9wZW5zYXVjZS51ay9hdXRob3JzL2ltYWdlLWhvbGRlci0wLnBuZyIsIkxpbmsiOiJodHRwOi93d3cuZXhhbXBsZS5jb20iLCJQb3NpdGlvbiI6IjQifV0sImF2YXRhciI6Imh0dHBzOi8vd3d3Lndvb2xoYS5jb20vbWVkaWEvMjAyMC8wMy9mbHV0dGVyLWNpcmNsZWF2YXRhci1taW5yYWRpdXMtbWF4cmFkaXVzLmpwZyIsInJvbGUiOiJXcml0ZXIiLCJpYXQiOjE2MTE1NTA4NjJ9.mYJ0Rz0KQhfnCEbd8BsW2zpyRmEAxx4pEsWY-aoVKhU",
      },
      body: `{\"biography\":\"${bio.value}\",\"avatar\":\"${currentUser.ProfilePicture}\"}`,
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
  document.getElementById("account-bio").innerText = currentUser.Bio;
  document.getElementById("account-image-upload").src =
    currentUser.ProfilePicture;
}

function GetFavorites() {
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
