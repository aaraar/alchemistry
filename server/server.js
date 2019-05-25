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
const PORT = process.env.PORT;

// middleware
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use("/static", express.static("dist/static"))
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
