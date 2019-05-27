// deps
import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import expHbs from "express-handlebars";

// routes
import mainRoutes from "./routes/main";

// vars
const app = express();
let PORT = process.env.PORT;
// for heroku
if (PORT == null || PORT == "") {
	PORT = 8000;
}
// middleware
app
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
