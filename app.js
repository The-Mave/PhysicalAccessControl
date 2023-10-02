import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import path from "path"
import { fileURLToPath } from 'url'
import bodyParser from "body-parser";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname,'views'));
app.set("view engine", "ejs");

app.listen(app.get("port"),function(){
    console.log("Server started at port " + app.get("port"));
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

routes(app);

export default app;