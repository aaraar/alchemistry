import express from "express";
import multer from "multer";
import {
	onCreateProfile,
	onProfileAll,
	onProfile,
	onCreateProfilePost,
	onRemove,
	onLogin,
	onLogout
} from "./profiles";

const upload = multer({ dest: "upload/" });
const router = express.Router();
var sess;
router
	.get("/", onHome)
	.get("/about", onAbout)
	.get("users/login", onLogin)
	.get("/user/:id", onProfile)
	.delete("/user/:id", onRemove)
	.get("/users/create", onCreateProfile)
	.post("/", onLogin)
	.post("/logout", onLogout)
	.post("/users/create", upload.single("avatar"), onCreateProfilePost)
	.get("/users", onProfileAll);

router.use(function(req, res, next) {
	res.status(404).send("Sorry can't find that!");
});

function onHome(req, res) {
	sess = req.session;
	res.render("home", { data: "hello world" });
}

function onAbout(req, res) {
	sess = req.session;
	res.send("about");
}

export default router;
