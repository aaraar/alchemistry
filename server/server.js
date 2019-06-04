// deps
require("dotenv/config");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const expHbs = require("express-handlebars");
const session = require("express-session");

// routes
const mainRoutes = require("./routes/main");

// vars
const app = express();
let PORT = process.env.PORT;
// for heroku
if (PORT == null || PORT == "") {
	PORT = 8080;
}
// middleware
app
	.use(
		session({
			path: "/",
			secret: process.env.SESSION_SECRET,
			resave: true,
			saveUninitialized: true
			// cookie: { secure: true }
		})
	)
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors())
	.use("/static", express.static("dist/static"))
	.use("/upload", express.static("upload"))
	.use("/", mainRoutes)
	.engine(
		".hbs",
		expHbs({
			extname: ".hbs",
			defaultLayout: "main"
		})
	)
	.set("view engine", ".hbs")
	.set("views", "dist/view");
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
