const express = require("express");
const multer = require("multer");
const {
	onCreateProfile,
	onProfileAll,
	onProfile,
	onCreateProfilePost,
	onRemove,
	onLogin,
	onLogout,
	onDndData,
	onAddCharacter
} = require("./profiles");

const upload = multer({ dest: "upload/" });
const router = express.Router();
router
	.get("/", onHome)
	.post("/", onLogin)
	.get("/about", onAbout)
	.get("users/login", onLogin)
	.get("/user/:id", onProfile)
	.post("/user/:id/characterDelete", onRemove)
	.post("/user/:id", onAddCharacter)
	.get("/users/create", onCreateProfile)
	.post("/logout", onLogout)
	.post("/users/create", upload.single("avatar"), onCreateProfilePost)
	.get("/users", onProfileAll)
	.get("/dndData", onDndData);

router.use(function(req, res, next) {
	res.status(404).send("Sorry can't find that!");
});

function onHome(req, res) {
	res.render("home", { data: "hello world" });
}

function onAbout(req, res) {
	res.send("about");
}

module.exports = router;
