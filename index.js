const express = require("express");
const app = express();
const path = require("path");
const centra = require("centra");
const url = "https://api.opensauce.uk";

app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/favicon"));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/users/:user", async function (req, res) {
  let user = await centra(url)
    .path("user")
    .path("get")
    .path(req.params.user)
    .send();

  if (user.statusCode == 404)
    return res.sendFile(path.join(__dirname + "/404.html"));
  if (user.statusCode == 400)
    return res.sendFile(path.join(__dirname + "/errorpages/400.html"));
  if (user.statusCode == 403)
    return res.sendFile(path.join(__dirname + "/errorpages/403.html"));
  user = JSON.parse(user.body);
  return res.status(200).render("profile.ejs", {
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    biography: user.biography,
    role: user.role,
    favorites: user.favorites,
  });
});
app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname + "/404.html"));
});
app.listen(3000);
