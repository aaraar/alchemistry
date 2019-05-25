import express from "express";
import { onCreateProfile, onProfileAll, onProfile } from "./profiles";

const router = express.Router();

router
  .get("/", onHome)
  .get("/about", onAbout)
  .get("/login", onLogin)
  .get("/user/:id", onProfile)
  .get("/users/create", onCreateProfile)
  .post("/users/create", onCreateProfile)
  .get("/users", onProfileAll);

router.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

function onHome(req, res) {
  res.render("home", { data: "hello world" });
}

function onAbout(req, res) {
  n;
  res.send("about");
}
function onLogin(req, res) {
  res.send("profile");
}

export default router;
